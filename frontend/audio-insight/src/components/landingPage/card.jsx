import { Link } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "../../utils/card-menu";
import { Box } from "@chakra-ui/react";
import { Image } from "react-bootstrap";
// import 'animate.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { QA, Summary, Transcribe } from "../../assets";
AOS.init();

export function ThreeDCard() {
  return (
    <div>
      <div
        className="flex flex-col md:flex-row items-center justify-around gap-0"
        data-aos="zoom-in"
      >
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-96 sm:h-70 md:h-80 lg:h-96 sm:w-72 md:w-80 lg:w-96 rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Transcribe Audio Effortlessly
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Discover the ease of converting audio to text.
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-12 sm:mt-4 md:mt-8 xs:mt-12">
              <Image
                src={Transcribe}
                height="1000"
                width="1000"
                className="h-full mt-12 sm:h-full md:h-full lg:h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Transcribe Audio"
              />
            </CardItem>
          </CardBody>
        </CardContainer>

        <Box
          fontSize={["sm", "md", "lg"]}
          className="flex flex-col space-y-2 text-neutral-400 dark:text-white max-w-sm text-lg xs:text-sm md:text-lg p-2"
          data-aos="zoom-in"
        >
          <h2 className="text-2xl font-bold">About Transcription</h2>
          <p>
            Transcription is the process of converting spoken words into written
            text. Our service allows you to easily transcribe your audio files
            into accurate and readable text documents.
          </p>
          <p>
            Whether you're capturing meeting notes, interviews, or lectures, our
            transcription tool can help you save time and ensure you don't miss
            any important details. Hover over the card to experience the
            functionality of our transcription service.
          </p>
        </Box>
      </div>

      <div
        className="flex flex-col-reverse md:flex-row items-center justify-around gap-0"
        data-aos="zoom-in"
      >
        <Box
          fontSize={["sm", "md", "lg"]}
          className="flex flex-col space-y-2 text-neutral-400 dark:text-white max-w-sm text-lg xs:text-sm md:text-lg p-2 "
          data-aos="zoom-in"
        >
          <h2 className="text-2xl font-bold">About Summarization</h2>
          <p>
            Summarization helps condense lengthy content into concise and
            coherent summaries, making it easier to grasp key points quickly.
            Our tool leverages advanced algorithms to generate accurate and
            meaningful summaries.
          </p>
          <p>
            Perfect for processing articles, reports, or any extensive text, our
            summarization feature saves you time and enhances comprehension.
            Explore how you can transform lengthy documents into brief,
            insightful summaries.
          </p>
        </Box>
        <CardContainer className="inter-var" data-aos="zoom-in">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-96 sm:h-70 md:h-80 lg:h-96 sm:w-72 md:w-80 lg:w-96 rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Summarize Your Content
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Discover the power of automatic content summarization.
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-12 sm:mt-4 md:mt-8 xs:mt-12">
              <Image
                src={Summary}
                height="1000"
                width="1000"
                className="h-full lg:h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Summarize AudiO"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      <div
        className="flex flex-col-reverse md:flex-row items-center justify-around gap-0 mb-10"
        data-aos="zoom-in"
      >
          <CardContainer className="inter-var" data-aos="zoom-in">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-96 sm:h-70 md:h-80 lg:h-96 sm:w-72 md:w-80 lg:w-96 rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Interactive Audio Q&A
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Engage with audio content through real-time questions and answers.
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-12 sm:mt-8 md:mt-8">
              <Image
                src={QA}
                height="1000"
                width="1000"
                className="h-full lg:h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="audio Q&A "
              />
            </CardItem>
          </CardBody>
        </CardContainer>
        <Box
          fontSize={["sm", "md", "lg"]}
          className="flex flex-col space-y-2 text-neutral-400 dark:text-white max-w-sm text-lg xs:text-sm md:text-lg p-2 "
          data-aos="zoom-in"
        >
          <h2 className="text-2xl font-bold ">About Audio Q&A</h2>
          <p>
            Audio Q&A allows users to interact with audio content by asking
            questions and receiving real-time answers. This feature enhances
            user engagement and provides immediate, relevant information from
            the audio.
          </p>
          <p>
            Ideal for educational purposes, podcasts, and interactive sessions,
            our Audio Q&A feature ensures you get the most out of your audio
            content by enabling a dynamic exchange of information.
          </p>
        </Box>
      
      </div>
    </div>
  );
}

