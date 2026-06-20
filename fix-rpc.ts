import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  console.log("Replacing function...");
  await prisma.$executeRawUnsafe(`DROP FUNCTION IF EXISTS public.get_top_konten_bulanan(bigint, integer, integer);`);
  
  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION public.get_top_konten_bulanan(
      ws_id BIGINT,
      target_year INT,
      target_month INT
    )
    RETURNS TABLE (
      id_konten      BIGINT,
      nama_konten    TEXT,
      jenis_konten   TEXT,
      pillar         TEXT,
      status_konten  TEXT,
      total_views    BIGINT,
      total_likes    BIGINT,
      total_comment  BIGINT,
      total_shares   BIGINT,
      total_favorites BIGINT,
      nilai_er       NUMERIC,
      engagement_rate NUMERIC
    )
    LANGUAGE plpgsql
    AS $$
    BEGIN
      RETURN QUERY
      SELECT
        k.id_konten,
        k.nama_konten,
        k.jenis_konten,
        k.pillar::TEXT,
        k.status_konten::TEXT,
        COALESCE(SUM(e.total_views), 0)::BIGINT     AS total_views,
        COALESCE(SUM(e.total_likes), 0)::BIGINT     AS total_likes,
        COALESCE(SUM(e.total_comment), 0)::BIGINT   AS total_comment,
        COALESCE(SUM(e.total_shares), 0)::BIGINT    AS total_shares,
        COALESCE(SUM(e.total_favorites), 0)::BIGINT AS total_favorites,
        COALESCE(AVG(e.nilai_er), 0)::NUMERIC       AS nilai_er,
        CASE 
          WHEN COALESCE(SUM(e.total_views), 0) = 0 THEN 0::NUMERIC
          ELSE ROUND( ((COALESCE(SUM(e.total_likes), 0) + COALESCE(SUM(e.total_comment), 0) + COALESCE(SUM(e.total_shares), 0) + COALESCE(SUM(e.total_favorites), 0))::NUMERIC / COALESCE(SUM(e.total_views), 1)::NUMERIC) * 100, 2 )
        END AS engagement_rate
      FROM konten k
      LEFT JOIN evaluasi e
        ON e.id_konten = k.id_konten
        AND EXTRACT(YEAR  FROM e.tanggal_evaluasi) = target_year
        AND EXTRACT(MONTH FROM e.tanggal_evaluasi) = target_month
      WHERE k.id_workspace = ws_id
      GROUP BY
        k.id_konten,
        k.nama_konten,
        k.jenis_konten,
        k.pillar,
        k.status_konten
      ORDER BY total_views DESC;
    END;
    $$;
  `);

  console.log("Function replaced. Testing query...");
  // Use Prisma query to map BIGINT manually to string, but Supabase parses it ok in frontend
  const res = await prisma.$queryRawUnsafe(`SELECT id_konten, nama_konten, total_views, engagement_rate FROM public.get_top_konten_bulanan(1, 2026, 6) LIMIT 2;`);
  console.log("RPC Test Result:", res);
}
run().catch(console.error).finally(() => prisma.$disconnect());
