import { NextRequest, NextResponse } from "next/server";
import { Workbook } from "exceljs";
import { useTranslation } from "@/lib/i18n";
import { fallbackLng } from "@/lib/i18n/settings";
import { Answers } from "@/types/answers";
import formatters from "./formatter";
import { Question } from "@/helpers/questions";

interface XlsxBody {
  questions: Array<Question>;
  answers: Answers;
  investigation: string;
  name?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { answers, questions, investigation, name }: XlsxBody =
    await request.json();
  const { value: locale = fallbackLng } = request.cookies.get(
    "NEXT_LOCALE"
  ) || { value: fallbackLng };
  const { t } = await useTranslation(locale, "translation");

  try {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(investigation);
    worksheet.properties.defaultColWidth = 12;
    const header = worksheet.getRow(1);
    const results = worksheet.getRow(2);

    header.getCell(1).value = t("xlsx.columns.student");
    results.getCell(1).value = name || t("xlsx.cells.no_name");
    results.getCell(1).style.alignment = { vertical: "top", wrapText: true };

    for (const [i, question] of questions.entries()) {
      const column = i + 2;
      const { id, answerType: type, ...config } = question;
      const value = answers[id]?.data;

      header.getCell(column).value = t("xlsx.columns.question", {
        number: i + 1,
      });

      const cell = results.getCell(column);

      cell.style.alignment = { vertical: "top", wrapText: true };
      await formatters[type]({
        locale,
        value,
        id,
        cell,
        ...config,
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      // Create a new NextResponse for the file with the given stream from the disk
      status: 200, // STATUS 200: HTTP - Ok
      headers: new Headers({
        // Headers
        "content-disposition": `attachment; filename=${
          name || investigation
        }.xlsx`, // State that this is a file attachment
        "content-type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Set the file type to an iso
        "content-length": `${buffer.byteLength}`, // State the file size
      }),
    });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}
