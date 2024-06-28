import { Link } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "../../utils/card-menu";
import { Box } from "@chakra-ui/react";
import { Image } from "react-bootstrap";
// import 'animate.css';
import AOS from "aos";
import "aos/dist/aos.css";
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
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height="1000"
                width="1000"
                className="h-60 sm:h-48 md:h-48 lg:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Transcribe AudiO"
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

      <div className="flex flex-col-reverse md:flex-row items-center justify-around gap-0" data-aos="zoom-in">
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
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height="1000"
                width="1000"
                className="h-60 sm:h-48 md:h-48 lg:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Summarize AudiO"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-0" data-aos="zoom-in">
        <CardContainer className="inter-var " data-aos="zoom-in">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-96 sm:h-70 md:h-80 lg:h-96 sm:w-72 md:w-80 lg:w-96 rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Identify Different Speakers
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Easily differentiate and label multiple speakers in your audio
              recordings.
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height="1000"
                width="1000"
                className="h-60 sm:h-48 md:h-48 lg:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Speaker Diarization"
              />
            </CardItem>
          </CardBody>
        </CardContainer>

        <Box
          fontSize={["sm", "md", "lg"]}
          className="flex flex-col space-y-2 text-neutral-400 dark:text-white max-w-sm text-lg xs:text-sm md:text-lg p-2 "
          data-aos="zoom-in"
        >
          <h2 className="text-2xl font-bold">About Speaker Diarization</h2>
          <p>
            Speaker diarization is the process of segmenting an audio stream
            into distinct speakers. It helps in identifying and labeling
            different speakers in a conversation.
          </p>
          <p>
            This feature is particularly useful for transcribing meetings,
            interviews, and any scenario involving multiple participants,
            allowing you to attribute spoken words to the correct individuals
            accurately.
          </p>
        </Box>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-around gap-0" data-aos="zoom-in">
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
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height="1000"
                width="1000"
                className="h-60 sm:h-48 md:h-48 lg:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="audio Q&A "
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
}
