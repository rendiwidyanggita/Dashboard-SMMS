import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const res = await prisma.$queryRaw`SELECT k.id_konten, k.nama_konten, COALESCE(SUM(e.total_views), 0)::BIGINT AS total_views FROM konten k LEFT JOIN evaluasi e ON e.id_konten = k.id_konten AND EXTRACT(YEAR FROM e.tanggal_evaluasi) = 2026 AND EXTRACT(MONTH FROM e.tanggal_evaluasi) = 6 WHERE k.id_workspace = 1 GROUP BY k.id_konten, k.nama_konten ORDER BY total_views DESC`;
  console.log(res);
}
run();
