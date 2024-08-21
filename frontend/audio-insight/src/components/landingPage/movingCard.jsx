import { InfiniteMovingCards } from "../../utils/infinite-moving-cards";

export function MovingCard() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-rgb(17,21,24) dark:bg-[#171923] dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden hidden sm:hidden md:hidden lg:flex">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}


const testimonials = [
  {
    quote:
      "Audio Insight has completely changed how we process audio data. The real-time transcription is accurate and has made a huge difference in our team discussions.",
    name: "Rohit Verma",
    title: "Project Manager at AudioWave Solutions",
  },
  {
    quote:
      "The summarization feature is a lifesaver! It efficiently condenses lengthy audio into insightful summaries, helping me focus on the key points without getting lost in the details.",
    name: "Anjali Mehra",
    title: "Research Analyst at SoundTech Labs",
  },
  {
    quote:
      "Audio Insight's audio Q&A feature is truly remarkable. It provides real-time, accurate responses to queries based on the audio, making our live sessions run smoothly.",
    name: "Vikram Singh",
    title: "Event Coordinator at LiveEvents India",
  },
  {
    quote:
      "With its seamless integration with MySQL and Node.js, Audio Insight has made it easy to manage our audio data efficiently. This tool has significantly improved our workflow.",
    name: "Nisha Kapoor",
    title: "Lead Developer at Sonic Systems Pvt. Ltd.",
  },
  {
    quote:
      "Audio Insight has cut down our podcast production time by half with its accurate transcription and summarization. It's an indispensable tool for our media production team.",
    name: "Rajesh Iyer",
    title: "Podcast Producer at VoiceBox Media India",
  },
];
