import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generatePDF = async (elementToPrintId: string) => {
  const element = document.getElementById(elementToPrintId);
  if (!element) {
    console.error("Element not found!");
    return;
  }

  // Опции для html2canvas
  const options = {
    scale: 1.0, // Увеличиваем качество
    useCORS: true, // Поддержка CORS для изображений
    scrollY: -window.scrollY, // Учитываем текущий скролл
  };

  html2canvas(element, options).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 0.5);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px", // Используем пиксели для точных размеров
      format: [canvas.width, canvas.height], // Устанавливаем формат PDF в размере элемента
    });

    // Размеры исходного изображения
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Добавляем изображение в PDF
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

    // Сохраняем PDF
    pdf.save("document.pdf");
  });
};
