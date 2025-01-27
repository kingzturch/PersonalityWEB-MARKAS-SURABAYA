import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { db } from "../API/MarkmateAPI";
import { collection, getDocs, query, where } from "firebase/firestore";
import ResultCard from "./ResultCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faArrowRotateRight,
  faGlobe,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import PopUp from "./PopUp";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import CopyToClipboard from "./CopyToClipboard";
import gsap from "gsap";

const Result = (props) => {
  const [user, setUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);
  const [counter, setCounter] = useState(0);
  const currentPageUrl = window.location.href;
  const copyButtonRef = useRef(null);

  // Reference untuk menangkap elemen hasil
  const resultRef = useRef(null);

  useEffect(() => {
    if (props.userEmail) {
      const fetchUser = async () => {
        const q = query(collection(db, "users"), where("email", "==", props.userEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUser(querySnapshot.docs[0].data());
        }
      };

      fetchUser();
    }
  }, [props.userEmail]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleCopyLink = () => {
    const textToCopy = `${shareDescription}\n\n${currentPageUrl}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyStatus("success");
      setCounter(5);
      gsap.to(copyButtonRef.current, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
    }).catch((err) => {
      setCopyStatus("fail");
      setCounter(5);
      console.error("Failed to copy text: ", err);
    });
  };

  // const onDownloadResult = () => {
  //   if (resultRef.current) {
  //     toJpeg(resultRef.current, { quality: 0.95 })
  //       .then((dataUrl) => {
  //         const link = document.createElement("a");
  //         link.href = dataUrl;
  //         link.download = "quiz-result.jpg";
  //         link.click();
  //       })
  //       .catch((error) => {
  //         console.error("Gagal mengunduh gambar: ", error);
  //       });
  //   }
  // };

  const onDownloadResult = () => {
    if (resultRef.current) {
      // Pilih bagian tertentu yang ingin didownload
      const contentToDownload = resultRef.current.querySelector(".downloadable-content");

      if (contentToDownload) {
        // Simpan background lama untuk dipulihkan nanti
        const originalBackground = contentToDownload.style.backgroundColor;

        // Setel background menjadi putih
        contentToDownload.style.backgroundColor = "#ffffff";

        toJpeg(contentToDownload, { quality: 0.95 })
          .then((dataUrl) => {
            const pdf = new jsPDF({
              orientation: "portrait",
              unit: "mm",
              format: [148, 210], // Ukuran A5 dalam mm
            });

            const pdfWidth = 148; // Lebar A5 dalam mm
            const pdfHeight = 210; // Tinggi A5 dalam mm

            // Hitung proporsi gambar
            const imgWidth = pdfWidth; // Gambar akan memenuhi lebar A5
            const imgHeight = (contentToDownload.offsetHeight / contentToDownload.offsetWidth) * imgWidth;

            // Posisi gambar di tengah halaman
            const x = 0; // Mulai dari kiri
            const y = (pdfHeight - imgHeight) / 2; // Tengah secara vertikal jika tinggi gambar lebih kecil

            pdf.addImage(dataUrl, "JPEG", x, y, imgWidth, imgHeight);
            pdf.save("quiz-result.pdf");
          })
          .catch((error) => {
            console.error("Gagal mengunduh file PDF: ", error);
          })
          .finally(() => {
            // Pulihkan background asli
            contentToDownload.style.backgroundColor = originalBackground;
          });
      } else {
        console.error("Bagian untuk diunduh tidak ditemukan.");
      }
    }
  };




  const resetCopyStatus = () => {
    setCopyStatus(null);
    setCounter(0);
  };

  const generateShareDescription = () => {
    switch(props.quizResult){
    case "Hacker":
      return '🧠 "Kalau bisa lebih pintar, kenapa harus ribet?"\n*Aku Hacker, kamu tim apa? Tim kuota habis atau tim jawaban susah? Share dong hasilmu!*\n';
    case "Hipster":
      return '✨ "Kalau hidup nggak estetik, apa masih hidup?"\n*Aku Hipster, kamu tim apa? Tim template atau tim cringe? Kasih tahu aku di share-mu!*\n';
    case "Hustler":
      return '🔥 "Mimpi itu gratis, tapi ngubah jadi cuan? Itu kerjaanku."\n*Aku Hustler, kamu tim apa? Tim wacana atau tim nggak nunggu lama? Drop hasilmu di story, yuk!*\n';
    }
  };

  const shareDescription = generateShareDescription(props.quizResult);
  

  return (
    <div className="result m-5 flex flex-col justify-center items-center h-full gap-3" ref={resultRef}>
      <div className="downloadable-content flex flex-col items-center text-center">
        <h1 className="font-bold text-[#DA1E3D] capitalize text-4xl">
          Hasil test anda
        </h1>
        <h3 className="font-bold text-xl mb-4">
          Selamat {user ? user.nama : "Anonymous"}, kamu termasuk ke
        </h3>
        <ResultCard
          imageResult={props.imageResult}
          quizResult={props.quizResult}
          descriptionResult={props.descriptionResult}
        />
      </div>



      <div className="flex flex-row justify-between w-full gap-3 xl:w-3/6 sm:w-5/6">
        <a
          className="px-5 py-2 cursor-pointer border bg-white border-[#DA1E3D] text-[#DA1E3D] font-semibold rounded-lg hover:bg-[#DA1E3D] hover:text-white transition duration-300 sm:max-w-48 sm:text-sm xl:max-w-72 xl:text-base"
          onClick={toggleModal}
        >
          Cek Peran Lainnya
          {isOpen && <PopUp isOpen={true} toggleModal={toggleModal} />}
        </a>

        <div className="flex flex-row self-end gap-3">
        <a
        ref={copyButtonRef}
        className="px-4 py-2 flex items-center justify-center cursor-pointer border bg-white text-[#DA1E3D] font-semibold rounded-md hover:bg-[#DA1E3D] hover:text-white border-[#DA1E3D] transition duration-300 space-x-2"
        onClick={handleCopyLink}
      >
        <FontAwesomeIcon icon={faLink} /> <span className="hidden sm:inline">Share Hasilmu!</span>
      </a>
          <a
            className="px-5 py-2 cursor-pointer border bg-white border-[#DA1E3D] text-[#DA1E3D] font-semibold rounded-lg hover:bg-[#DA1E3D] hover:text-white transition duration-300"
            onClick={props.onRetakeQuiz}
          > 
            <FontAwesomeIcon icon={faArrowRotateRight} />
          </a>
          <a
            className="px-5 py-2 cursor-pointer border bg-white border-[#DA1E3D] text-[#DA1E3D] font-semibold rounded-lg hover:bg-[#DA1E3D] hover:text-white transition duration-300"
            onClick={onDownloadResult}
          >
            <FontAwesomeIcon icon={faDownload} />
          </a>
        </div>
      </div>
      <a
        className="mt-5 px-4 py-2 flex items-center justify-center cursor-pointer border bg-[#DA1E3D] text-white font-semibold rounded-md hover:bg-white hover:text-[#DA1E3D] border-[#DA1E3D] transition duration-300 space-x-2"
        href="https://chat.whatsapp.com/FwipTMw49DP70E63yz8r3N"
      ><span>Ayo Masuk Ke Komunitas Kita!</span></a>

      <h3 className="font-semibold text-xl text-center">Share di social media!</h3>
      <div className="flex flex-column gap-2 mt-1">
        <FacebookShareButton url={currentPageUrl} quote={shareDescription}>
          <FacebookIcon size={48} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={currentPageUrl} title={shareDescription}>
          <TwitterIcon size={48} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={currentPageUrl} title={shareDescription}>
          <WhatsappIcon size={48} round={true} />
        </WhatsappShareButton>

        <CopyToClipboard copyStatus={copyStatus} counter={counter} />
      </div>

      <h5 className="font-semibold text-md mt-4 text-center">
        Ingin mengenal terkait startup dan pelatihan lainnya, bisa hubungi
      </h5>
      <div className="flex flex-column gap-5 mt-2">
        <a href="https://markas.id/">
          <FontAwesomeIcon icon={faGlobe} size="64" />
        </a>
        <a href="https://www.instagram.com/markas.sby/">
          <FontAwesomeIcon icon={faInstagram} size="64" />
        </a>
      </div>
      <CopyToClipboard copyStatus={copyStatus} counter={counter} resetCopyStatus={resetCopyStatus} />
    </div>
  );
};

Result.propTypes = {
  userEmail: PropTypes.string.isRequired,
  quizResult: PropTypes.string.isRequired,
  descriptionResult: PropTypes.string.isRequired,
  imageResult: PropTypes.string.isRequired,
  onRetakeQuiz: PropTypes.func.isRequired,
};

export default Result;
