import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/header";
import { PiWaveformBold } from "react-icons/pi";
import Sheet from "react-modal-sheet";
import { FaDownload, FaTrash } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import SideBar from "../components/sidebar";
import { ToastContainer, toast } from "react-toastify";
import Swal2 from "sweetalert2";

function Home() {
  const [stability, setStability] = useState(50);
  const [similarity, setSimilarity] = useState(75);
  const [openSheet, setOpenSheet] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [remainingCredit, setRemainingCredit] = useState(50);
  const [currentText, setCurrentText] = useState("");
  const [audioAvailable, setAudioAvailable] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [audio, setAudio] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  let textAreaRef = useRef(null);
  const apiKey = "a3ee62e1e845e809a9a64024a26e7989";

  useEffect(() => {
    getVoices();
  }, []);

  const onDismiss = () => {
    setOpenSheet(false);
  };

  let getVoices = () => {
    fetch("https://api.elevenlabs.io/v1/voices", {
      method: "GET",
      headers: { "xi-api-key": apiKey },
    })
      .then((res) => res.json())
      .then((res) => {
        setVoices(res.voices.reverse());
        setSelectedVoice(res.voices.reverse()[0]);
      })
      .catch((err) => console.error(err));
  };

  let generateAudio = async () => {
    const ctx = new AudioContext();
    setGenerating(true);
    setAudioAvailable(false);

    let res = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/" +
        (selectedVoice != null
          ? selectedVoice["voice_id"]
          : "hwnuNyWkl9DjdTFykrN6") +
        "?output_format=mp3_44100_96",
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: currentText,
          voice_settings: {
            stability: (stability / 100).toFixed(1),
            similarity_boost: (similarity / 100).toFixed(1),
          },
        }),
      }
    );
    if (res.status == 200 || res.status == 201) {
      setAudioAvailable(true);
      toast.success("sound generated successfully");
      //reduce user credit
      let newCredit = remainingCredit - currentText.length;
      setRemainingCredit(newCredit);
    } else {
      setGenerating(false);
      toast.error("something went wrong");
    }
    setAudioBlob(res.clone());
    let audioData = await res.arrayBuffer();
    let res_cont = await ctx.decodeAudioData(audioData);
    setAudio(res_cont);
    setGenerating(false);
  };

  let playAudio = () => {
    if (audioPlaying) return;
    const ctx = new AudioContext();
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(0);
    setAudioPlaying(true);
    playSound.onended = () => {
      setAudioPlaying(false);
    };
  };

  let downloadAudio = async () => {
    try {
      let blob = await audioBlob.blob();
      const url = URL.createObjectURL(blob);
      // Create a download link
      const link = document.createElement("a");
      link.href = url;
      link.download = "aivoice.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      toast.warn("already downloaded");
    }
  };

  let playPreview = async (url) => {
    const ctx = new AudioContext();
    let res = await fetch(url);
    if (res.status == 200 || res.status == 201) {
      toast.success("sound generated successfully");
    } else {
      toast.error("something went wrong");
    }
    let audioData = await res.arrayBuffer();
    let res_cont = await ctx.decodeAudioData(audioData);
    const playSound = ctx.createBufferSource();
    playSound.buffer = res_cont;
    playSound.connect(ctx.destination);
    playSound.start(0);
    playSound.onended = () => {};
  };

  return (
    <>
      <Header setOpenSideBar={setOpenSideBar} />
      {/* body */}
      <div className="p-1 px-3 mx-auto flex flex-col gap-2 mt-4   max-w-lg  w-full ">
        {/* select voice */}
        <div className="p-4 bg-white dark:bg-slate-900 shadow-lg rounded-lg flex gap-3 justify-between items-center">
          <div className="flex gap-2 items-center">
            <PiWaveformBold size={24} className="dark:text-slate-200 " />
            <p className="dark:text-slate-200 font-bold">Voice</p>
          </div>
          <motion.div
            onClick={() => setOpenSheet(true)}
            whileTap={{ scale: 1.2 }}
            className="ring-1 ring-slate-800 p-1 rounded-lg flex gap-2 items-center"
          >
            <img
              src="/imgs/aivoice.png"
              className="h-[30px] rounded-full w-[30px] object-cover object-top"
              alt=""
            />
            <p className="dark:text-slate-200">
              {selectedVoice != null ? selectedVoice.name : ""}
            </p>
            <IoIosArrowDown className="dark:text-slate-200" size={24} />
          </motion.div>
        </div>
        {/* text area */}
        <div className="p-4 bg-white dark:bg-slate-900 shadow-lg rounded-lg flex gap-1 justify-between items-center flex-col flex-1 h-52">
          <div className="flex justify-between w-full mb-2">
            <p
              className={
                currentText.length <= remainingCredit
                  ? "dark:text-slate-200"
                  : "text-red-500"
              }
            >
              credit :{" "}
              {currentText.length
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p className="dark:text-slate-300">
              remaining :{" "}
              {remainingCredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
          <motion.textarea
            whileTap={{
              scale: 1.05,
            }}
            ref={textAreaRef}
            onChange={(e) => setCurrentText(e.target.value)}
            className="p-3 bg-slate-100 dark:bg-slate-700 dark:text-slate-200 flex-1 rounded-lg w-full
          outline-0 focus:ring-1 ring-slate-400"
            name=""
            id=""
            cols="30"
            rows={10}
          ></motion.textarea>
          <div className="w-full mt-2">
            <motion.div
              whileTap={{ scale: 1.1 }}
              className="flex gap-1  items-center cursor-pointer w-fit p-1"
              onClick={() => {
                textAreaRef.current.value = "";
                setCurrentText("");
              }}
            >
              <FaTrash size={16} className="text-red-300" />{" "}
              <span className="dark:text-slate-200 text-sm">Clear</span>
            </motion.div>
          </div>
        </div>
        {/* adjust tone */}
        <div className="p-4 bg-white dark:bg-slate-900 shadow-lg rounded-lg flex gap-5 justify-between items-center flex-col">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="font-bold text-lg dark:text-slate-200">
                Stabillity{" "}
                <span className="text-sm text-slate-400">({stability}%)</span>
              </p>
              {stability < 30 && (
                <p className="text-yellow-500 text-xs">
                  Under 30% may lead to instability
                </p>
              )}
            </div>
            <div className="flex mt-1 justify-between">
              <p className="dark:text-slate-400 text-sm">More variable</p>
              <p className="dark:text-slate-400 text-sm">More stable</p>
            </div>
            <div>
              <input
                max={100}
                min={1}
                onChange={(e) => setStability(e.target.value)}
                defaultValue={stability}
                className="w-full "
                type="range"
              />
            </div>
          </div>
          <hr className="bg-slate-300" />
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex justify-between items-center">
              <p className="font-bold text-lg dark:text-slate-200">
                Similarity{" "}
                <span className="text-sm text-slate-400">({similarity}%)</span>
              </p>
            </div>
            <div className="flex mt-1 justify-between">
              <p className="dark:text-slate-400 text-sm">None</p>
              <p className="dark:text-slate-400 text-sm">Exaggerated</p>
            </div>
            <div>
              <input
                max={100}
                min={1}
                onChange={(e) => setSimilarity(e.target.value)}
                defaultValue={similarity}
                className="w-full "
                type="range"
              />
            </div>
          </div>
        </div>
        {/* play and download btn */}
        {audioAvailable && (
          <div className="flex gap-2">
            <motion.div
              onClick={() => playAudio()}
              whileTap={{
                scale: 1.05,
              }}
              className="p-4 flex-1 bg-white dark:bg-slate-900 shadow-lg rounded-lg flex gap-3 items-center justify-center"
            >
              <FaPlay size={18} className="dark:text-slate-200" />
              <p className="font-bold text-lg dark:text-slate-200 tracking-wider">
                {audioPlaying ? "Playing" : "Play"}
              </p>
            </motion.div>
            <motion.div
              onClick={() => downloadAudio()}
              whileTap={{
                scale: 1.05,
              }}
              className="p-4 flex-1 bg-white dark:bg-slate-900 shadow-lg justify-center rounded-lg flex gap-3 items-center "
            >
              <FaDownload size={18} className="dark:text-slate-200" />
              <p className="font-bold text-lg dark:text-slate-200 tracking-wider">
                Download
              </p>
            </motion.div>
          </div>
        )}
        {/* generate btn */}
        <motion.div
          onClick={() => {
            if (currentText.length == 0) {
              toast.warn("text cannot be empty");
            } else {
              if (currentText.length <= remainingCredit) {
                generateAudio();
              } else {
                Swal2.fire({
                  title: "Not enough credit",
                  icon: "info",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Get More Credit",
                }).then((result) => {
                  if (result.isConfirmed) {
                    location.href = "/#/buy-credit";
                  }
                });
              }
            }
          }}
          whileTap={{
            scale: 1.05,
          }}
          className="p-4 bg-white dark:bg-slate-900 shadow-lg rounded-lg flex gap-3 justify-center items-center mb-2"
        >
          <PiWaveformBold size={24} className="dark:text-slate-200 " />

          <p className="font-extrabold text-lg dark:text-slate-200 tracking-wider">
            {generating ? "loading" : "Generate"}
          </p>
        </motion.div>
      </div>
      {/* bottom sheet */}
      <Sheet
        snapPoints={[0.8, 0.7, 0.5]}
        initialSnap={0}
        isOpen={openSheet}
        onClose={() => setOpenSheet(false)}
        className="max-w-xl mx-auto"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Sheet.Scroller draggableAt="both">
              <div className="grid grid-cols-3 gap-3 ">
                {voices.map((voice) => (
                  <motion.div
                    whileTap={{
                      scale: 1.05,
                    }}
                    onClick={() => {
                      setSelectedVoice(voice);
                      playPreview(voice.preview_url);
                      // setOpenSheet(false);
                    }}
                    key={voice.voice_id}
                    className="relative rounded-lg overflow-hidden shadow-lg h-32"
                  >
                    <img
                      src="/imgs/aivoice.png"
                      alt=""
                      className="object-cover"
                    />
                    <div className="absolute flex gap-2 items-center justify-center py-1 bottom-0 bg-black opacity-80 w-full">
                      <p className="text-slate-100 font-bold">{voice.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setOpenSheet(false)} />
      </Sheet>
      {/* sidebar */}
      <AnimatePresence>
        {openSideBar && <SideBar setOpenSideBar={setOpenSideBar} />}
      </AnimatePresence>
      <ToastContainer autoClose={1500} theme="dark" limit={2} />
    </>
  );
}

export default Home;
