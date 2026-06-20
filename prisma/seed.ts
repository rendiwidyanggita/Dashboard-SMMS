/**
 * Prisma Seed Script — Dashboard SMMS
 *
 * Menambahkan data dummy untuk semua workspace:
 *  - Content plan (konten) dengan pillar & status yang bervariasi
 *  - Evaluasi dengan metrik engagement (likes, views, dst.)
 *
 * Jalankan dengan:  npx ts-node --project tsconfig.json prisma/seed.ts
 * atau              npx tsx prisma/seed.ts
 */

import { PrismaClient, pillar_konten, status_konten_enum } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────
//  HELPER
// ─────────────────────────────────────────────────────────────
function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Hitung Engagement Rate: ((likes + comment + shares + favorites) / views) * 100 */
function calcER(likes: number, views: number, comment: number, shares: number, favorites: number): number {
  if (views === 0) return 0;
  return parseFloat((((likes + comment + shares + favorites) / views) * 100).toFixed(2));
}

// ─────────────────────────────────────────────────────────────
//  KONTEN DUMMY PER WORKSPACE
// ─────────────────────────────────────────────────────────────

interface KontenDummy {
  nama_konten: string;
  deskripsi_konten: string;
  pillar: pillar_konten;
  status_konten: status_konten_enum;
  jenis_konten: string;
  tanggal_upload_offset: number; // hari dari hari ini (negatif = lampau)
  evaluasiList: EvalDummy[];
}

interface EvalDummy {
  dayOffset: number; // hari dari tanggal_upload
  total_likes: number;
  total_views: number;
  total_comment: number;
  total_shares: number;
  total_favorites: number;
}

// Template konten — diatur dekat dengan hari ini agar muncul di Trend (7 Hari) & Top Performer (Bulan Ini)
const kontenTemplates: KontenDummy[] = [
  // ── AWARENESS ─────────────────────────────────
  {
    nama_konten: "Mengenal Sanggaluri Park: Surga Edukasi & Rekreasi",
    deskripsi_konten: "Video pengenalan fasilitas dan wahana unggulan Sanggaluri Park Purbalingga untuk keluarga.",
    pillar: "awareness",
    status_konten: "uploaded",
    jenis_konten: "Reels",
    tanggal_upload_offset: -6,
    evaluasiList: [
      { dayOffset: 0,  total_likes: 1240, total_views: 18500, total_comment: 87,  total_shares: 210, total_favorites: 320 },
      { dayOffset: 2,  total_likes: 1850, total_views: 29000, total_comment: 143, total_shares: 390, total_favorites: 510 },
      { dayOffset: 5,  total_likes: 2100, total_views: 35200, total_comment: 201, total_shares: 450, total_favorites: 640 },
    ],
  },
  {
    nama_konten: "7 Fakta Menarik Sanggaluri yang Belum Banyak Diketahui",
    deskripsi_konten: "Carousel berisi fakta-fakta unik tentang sejarah dan keunggulan taman.",
    pillar: "awareness",
    status_konten: "uploaded",
    jenis_konten: "Carousel",
    tanggal_upload_offset: -5,
    evaluasiList: [
      { dayOffset: 0,  total_likes: 870, total_views: 12300, total_comment: 55,  total_shares: 140, total_favorites: 190 },
      { dayOffset: 3,  total_likes: 1150, total_views: 17800, total_comment: 98,  total_shares: 215, total_favorites: 280 },
    ],
  },
  {
    nama_konten: "Behind the Scene: Persiapan Event Seru di Sanggaluri",
    deskripsi_konten: "Konten BTS memperlihatkan proses persiapan event spesial.",
    pillar: "awareness",
    status_konten: "uploaded",
    jenis_konten: "Story",
    tanggal_upload_offset: -4,
    evaluasiList: [
      { dayOffset: 0,  total_likes: 430, total_views: 6700,  total_comment: 28,  total_shares: 60,  total_favorites: 95 },
      { dayOffset: 1,  total_likes: 560, total_views: 8900,  total_comment: 41,  total_shares: 85,  total_favorites: 130 },
    ],
  },
  {
    nama_konten: "Vlog Keluarga Seharian di Sanggaluri Park",
    deskripsi_konten: "Video vlog satu hari penuh menjelajahi wahana, kuliner, dan area bermain.",
    pillar: "awareness",
    status_konten: "pending",
    jenis_konten: "Video",
    tanggal_upload_offset: 0,
    evaluasiList: [],
  },
  {
    nama_konten: "Koleksi Foto Drone Sanggaluri Park dari Ketinggian",
    deskripsi_konten: "Foto aerial menampilkan keindahan taman dari sudut pandang drone.",
    pillar: "awareness",
    status_konten: "unuploaded",
    jenis_konten: "Post",
    tanggal_upload_offset: 2,
    evaluasiList: [],
  },

  // ── CONSIDERATION ─────────────────────────────
  {
    nama_konten: "Harga Tiket & Paket Terbaru Sanggaluri Park 2026",
    deskripsi_konten: "Infografis lengkap harga tiket masuk, paket keluarga, dan promo spesial.",
    pillar: "consideration",
    status_konten: "uploaded",
    jenis_konten: "Carousel",
    tanggal_upload_offset: -7,
    evaluasiList: [
      { dayOffset: 0,  total_likes: 2100, total_views: 32000, total_comment: 310, total_shares: 580, total_favorites: 890 },
      { dayOffset: 2,  total_likes: 3400, total_views: 51000, total_comment: 520, total_shares: 810, total_favorites: 1200 },
      { dayOffset: 4,  total_likes: 3900, total_views: 59500, total_comment: 640, total_shares: 920, total_favorites: 1380 },
    ],
  },
  {
    nama_konten: "Review Jujur Wahana Terpopuler Sanggaluri",
    deskripsi_konten: "Review konten berdasarkan pengalaman nyata pengunjung tentang wahana favorit.",
    pillar: "consideration",
    status_konten: "uploaded",
    jenis_konten: "Reels",
    tanggal_upload_offset: -3,
    evaluasiList: [
      { dayOffset: 0,  total_likes: 1580, total_views: 22400, total_comment: 185, total_shares: 340, total_favorites: 610 },
      { dayOffset: 2,  total_likes: 2230, total_views: 34100, total_comment: 290, total_shares: 480, total_favorites: 870 },
    ],
  },
  {
    nama_konten: "Panduan Lengkap Wisata ke Sanggaluri Park",
    deskripsi_konten: "Tips dan panduan perjalanan: rute, parkir, fasilitas, dan hal yang perlu dipersiapkan.",
    pillar: "consideration",
    status_konten: "uploaded",
    jenis_konten: "Carousel",
    tanggal_upload_offset: -2,
    evaluasiList: [
      { dayOffset: 0,  total_likes: 980, total_views: 15600, total_comment: 124, total_shares: 270, total_favorites: 410 },
      { dayOffset: 1,  total_likes: 1340, total_views: 22100, total_comment: 198, total_shares: 350, total_favorites: 560 },
      { dayOffset: 2,  total_likes: 1520, total_views: 25800, total_comment: 230, total_shares: 390, total_favorites: 640 },
    ],
  },
  {
    nama_konten: "Sanggaluri vs Taman Wisata Lain: Mana yang Lebih Worth It?",
    deskripsi_konten: "Komparasi ringan dengan taman wisata serupa dari sisi harga, fasilitas, dan pengalaman.",
    pillar: "consideration",
    status_konten: "pending",
    jenis_konten: "Video",
    tanggal_upload_offset: 1,
    evaluasiList: [],
  },
  {
    nama_konten: "FAQ: Pertanyaan yang Paling Sering Ditanyakan Pengunjung",
    deskripsi_konten: "Menjawab 10 pertanyaan populer seputar kunjungan ke Sanggaluri Park.",
    pillar: "consideration",
    status_konten: "unuploaded",
    jenis_konten: "Carousel",
    tanggal_upload_offset: 3,
    evaluasiList: [],
  },

  // ── CONVERSION ────────────────────────────────
  {
    nama_konten: "PROMO SPESIAL: Diskon 30% Tiket Sanggaluri Akhir Pekan Ini!",
    deskripsi_konten: "Konten promosi diskon terbatas untuk mendorong pembelian tiket segera.",
    pillar: "conversion",
    status_konten: "uploaded",
    jenis_konten: "Post",
    tanggal_upload_offset: -5,
    evaluasiList: [
      { dayOffset: 0,  total_likes: 3200, total_views: 45000, total_comment: 890, total_shares: 1200, total_favorites: 2100 },
      { dayOffset: 2,  total_likes: 4800, total_views: 67500, total_comment: 1340, total_shares: 1850, total_favorites: 3200 },
      { dayOffset: 4,  total_likes: 5100, total_views: 71000, total_comment: 1420, total_shares: 1960, total_favorites: 3400 },
    ],
  },
  {
    nama_konten: "Giveaway Tiket Gratis — Ikuti Caranya Sekarang!",
    deskripsi_konten: "Konten giveaway untuk mendorong engagement dan awareness sekaligus.",
    pillar: "conversion",
    status_konten: "uploaded",
    jenis_konten: "Post",
    tanggal_upload_offset: -4,
    evaluasiList: [
      { dayOffset: 0,  total_likes: 6800, total_views: 89000, total_comment: 4200, total_shares: 3100, total_favorites: 5600 },
      { dayOffset: 2,  total_likes: 8200, total_views: 110000, total_comment: 5600, total_shares: 4000, total_favorites: 6800 },
    ],
  },
  {
    nama_konten: "Flash Sale Tiket Pelajar — Hanya Sampai Minggu!",
    deskripsi_konten: "Promosi khusus pelajar dengan harga spesial untuk mendorong konversi cepat.",
    pillar: "conversion",
    status_konten: "uploaded",
    jenis_konten: "Story",
    tanggal_upload_offset: -1,
    evaluasiList: [
      { dayOffset: 0,  total_likes: 1800, total_views: 28000, total_comment: 340, total_shares: 560, total_favorites: 980 },
      { dayOffset: 1,  total_likes: 2300, total_views: 36500, total_comment: 490, total_shares: 720, total_favorites: 1280 },
    ],
  },
  {
    nama_konten: "Testimoni Nyata: Kesan Pengunjung Sanggaluri Park",
    deskripsi_konten: "Kumpulan video testimoni singkat pengunjung yang puas dan merekomendasikan.",
    pillar: "conversion",
    status_konten: "cancelled",
    jenis_konten: "Reels",
    tanggal_upload_offset: -2,
    evaluasiList: [],
  },
  {
    nama_konten: "Paket Rombongan Sekolah — Hubungi Kami Sekarang",
    deskripsi_konten: "Penawaran khusus paket rombongan untuk sekolah dengan harga terjangkau.",
    pillar: "conversion",
    status_konten: "unuploaded",
    jenis_konten: "Post",
    tanggal_upload_offset: 4,
    evaluasiList: [],
  },
];

// ─────────────────────────────────────────────────────────────
//  MAIN SEED
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log("🌱  Memulai proses seeding data dummy…\n");

  // Hapus semua data evaluasi dan konten yang lama agar tidak menumpuk
  console.log("🗑️  Membersihkan data lama (Evaluasi & Konten)...");
  await prisma.evaluasi.deleteMany({});
  await prisma.konten.deleteMany({});
  console.log("    Data lama berhasil dihapus.\n");

  // Ambil semua workspace yang sudah ada
  const allWorkspaces = await prisma.workspace.findMany();

  if (allWorkspaces.length === 0) {
    console.warn("⚠️  Tidak ada workspace ditemukan. Seed dibatalkan.");
    console.warn("    Pastikan minimal satu workspace sudah dibuat terlebih dahulu.");
    return;
  }

  console.log(`📋  Ditemukan ${allWorkspaces.length} workspace:`);
  allWorkspaces.forEach((ws) => console.log(`    • [${ws.id_workspace}] ${ws.nama_workspace}`));
  console.log();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const workspace of allWorkspaces) {
    console.log(`\n━━━ Workspace: ${workspace.nama_workspace} (ID: ${workspace.id_workspace}) ━━━`);

    for (const tmpl of kontenTemplates) {
      const tanggalUpload = new Date(today);
      tanggalUpload.setDate(today.getDate() + tmpl.tanggal_upload_offset);

      // Buat konten
      const konten = await prisma.konten.create({
        data: {
          id_workspace:     workspace.id_workspace,
          nama_konten:      tmpl.nama_konten,
          deskripsi_konten: tmpl.deskripsi_konten,
          pillar:           tmpl.pillar,
          status_konten:    tmpl.status_konten,
          jenis_konten:     tmpl.jenis_konten,
          tanggal_upload:   tanggalUpload,
          link_konten:      null,
        },
      });

      console.log(`  ✅ Konten dibuat: "${tmpl.nama_konten.substring(0, 50)}…" [${tmpl.status_konten}]`);

      // Buat evaluasi (hanya untuk konten yang sudah uploaded)
      if (tmpl.evaluasiList.length > 0) {
        for (const ev of tmpl.evaluasiList) {
          const tanggalEval = new Date(tanggalUpload);
          tanggalEval.setDate(tanggalUpload.getDate() + ev.dayOffset);

          // Tambahkan variasi acak kecil supaya data lebih realistis
          const likes     = ev.total_likes     + rand(-50, 50);
          const views     = ev.total_views     + rand(-200, 200);
          const comment   = ev.total_comment   + rand(-20, 20);
          const shares    = ev.total_shares    + rand(-30, 30);
          const favorites = ev.total_favorites + rand(-40, 40);
          const er        = calcER(likes, views, comment, shares, favorites);

          await prisma.evaluasi.create({
            data: {
              id_konten:        konten.id_konten,
              tanggal_evaluasi: tanggalEval,
              total_likes:      Math.max(0, likes),
              total_views:      Math.max(1, views),
              total_comment:    Math.max(0, comment),
              total_shares:     Math.max(0, shares),
              total_favorites:  Math.max(0, favorites),
              nilai_er:         new Decimal(er),
            },
          });
        }
        console.log(`     📊  ${tmpl.evaluasiList.length} evaluasi ditambahkan`);
      }
    }

    console.log(`\n  ✔ Selesai untuk workspace "${workspace.nama_workspace}" — ${kontenTemplates.length} konten ditambahkan`);
  }

  console.log("\n\n🎉  Seeding selesai! Semua data dummy berhasil dimasukkan.");
  console.log(`    Total konten: ${kontenTemplates.length * allWorkspaces.length}`);
}

main()
  .catch((e) => {
    console.error("❌  Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
