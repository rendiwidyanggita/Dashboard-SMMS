import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get("workspaceId");
  const month = searchParams.get("month");
  const filterType = searchParams.get("filter");
  const format = searchParams.get("format") || "csv";

  try {
    let dateFilter = {};
    if (filterType === "last_week") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      dateFilter = {
        tanggal_evaluasi: {
          gte: lastWeek,
        },
      };
    } else if (month && month !== "all") {
      const monthMap: Record<string, number> = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11,
      };

      const monthIndex = monthMap[month.toLowerCase()];
      if (monthIndex !== undefined) {
        const year = new Date().getFullYear();
        const startDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex + 1, 0);

        dateFilter = {
          tanggal_evaluasi: {
            gte: startDate,
            lte: endDate,
          },
        };
      }
    }

    const evaluasiData = await prisma.evaluasi.findMany({
      where: {
        ...(workspaceId
          ? {
              konten: {
                id_workspace: Number(workspaceId),
              },
            }
          : {}),
        ...dateFilter,
      },
      include: {
        konten: {
          include: {
            workspace: true,
          },
        },
      },
    });

    const data = evaluasiData.map((item) => ({
      "Nama Konten": item.konten?.nama_konten || "-",
      Workspace: item.konten?.workspace?.nama_workspace || "-",
      Pillar: item.konten?.pillar || "-",
      "Status Konten": item.konten?.status_konten || "-",
      "Tanggal Upload": item.konten?.tanggal_upload
        ? item.konten.tanggal_upload.toISOString().split("T")[0]
        : "-",
      "Tanggal Evaluasi": item.tanggal_evaluasi
        ? item.tanggal_evaluasi.toISOString().split("T")[0]
        : "-",
      Views: item.total_views || 0,
      Likes: item.total_likes || 0,
      Comment: item.total_comment || 0,
      Shares: item.total_shares || 0,
      Favorite: item.total_favorites || 0,
      ER: `${item.nilai_er || 0}%`,
    }));

    const dateStr = new Date().toISOString().split("T")[0];

    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Evaluasi");

      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="laporan-evaluasi-${dateStr}.xlsx"`,
        },
      });
    } else {
      // CSV Export
      const worksheet = XLSX.utils.json_to_sheet(data);
      const csvContent = XLSX.utils.sheet_to_csv(worksheet);
      // Add UTF-8 BOM for Excel compatibility
      const BOM = "\uFEFF";

      return new NextResponse(BOM + csvContent, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="laporan-evaluasi-${dateStr}.csv"`,
        },
      });
    }
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json(
      { error: "Gagal menghasilkan laporan" },
      { status: 500 },
    );
  }
}
