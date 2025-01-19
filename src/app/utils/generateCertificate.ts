import jsPDF from "jspdf";

const generateCertificate = (userName: string, score: number) => {
  const doc = new jsPDF();

  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  
  doc.setDrawColor(0, 0, 0); 
  doc.setLineWidth(1.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(30);
  doc.text("Sign Language Translator", pageWidth / 2, 40, {
  align: "center",
  });

  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("Certificate of Achievement", pageWidth / 2, 65, {
    align: "center",
  });

  
  doc.setFont("helvetica", "italic");
  doc.setFontSize(16);
  doc.setTextColor(100);
  doc.text("This certifies that", pageWidth / 2, 80, { align: "center" });

  
  doc.setFont("times", "bold");
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 255);
  doc.text(userName, pageWidth / 2, 95, { align: "center" });

  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.setTextColor(0);
  const description = `has successfully completed the Sign Language Test, demonstrating 
exceptional proficiency in recognizing and making accurate signs for fundamental words and phrases.`;
  doc.text(description, pageWidth / 2, 115, {
    align: "center",
    maxWidth: pageWidth - 40,
  });

  
  const scoreText = `The test consisted of 5 tasks where the participant was asked to make signs for basic words, such as 'hello,' 'thank you,' and others. Based on their performance, the participant achieved an outstanding score of ${score}% on the test.`;
  doc.text(scoreText, pageWidth / 2, 140, {
    align: "center",
    maxWidth: pageWidth - 40,
  });

  
  doc.setDrawColor(0, 0, 0); 
  doc.setLineWidth(0.5);
  doc.line(pageWidth / 4, 165, (pageWidth * 3) / 4, 165);

  
  const closingText = `We commend your effort and dedication in learning sign language and believe this achievement reflects your commitment to enhancing communication inclusivity.`;
  doc.text(closingText, pageWidth / 2, 175, {
    align: "center",
    maxWidth: pageWidth - 40,
  });

  
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, pageHeight - 20);
  doc.text("Sign Language Learning Program", pageWidth - 20, pageHeight - 20, {
    align: "right",
  });

  
  doc.save("Certificate.pdf");
};

export default generateCertificate;
