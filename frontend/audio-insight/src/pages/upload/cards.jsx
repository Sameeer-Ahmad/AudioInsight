import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Card = ({ title, description, imageUrl, link }) => (
  <Flex
    direction={["column", "row"]}
    borderRadius="lg"
    ml={-4}
    p="4"
    mb="4"
    bg="rgb(40, 50, 58)"
  >
    <Flex direction="column" flex="1" pt={4}>
      <Text color={"white"} fontWeight="bold" fontSize="lg" mb={4} pl={2}>
        {title}
      </Text>
      <Text color={"white"} mb={4} pl={2}>
        {description}
      </Text>
      <Link to={link} style={{ textDecoration: "none" }}>
        <Box
          display="flex"
          alignItems="center"
          color="white"
          w={"fit-content"}
          borderRadius="full"
          pl={2}
          pr={4}
          pt={1}
          pb={1}
          cursor="pointer"
          _hover={{ bg: "#881337" }}
        >
          <Text color="white" mr={2}>
            Get Started
          </Text>
          <FaArrowRightLong />
        </Box>
      </Link>
    </Flex>

    <Box ml="4">
      <Image
        borderRadius={"lg"}
        src={imageUrl}
        alt={title}
        boxSize="200px"
        h={"180px"}
        w={"250px"}
        objectFit="cover"
      />
    </Box>
  </Flex>
);
/**
 * 
 <Flex direction="column" flex="1" pt={4}>
      <Text color={"white"} fontWeight="bold" fontSize="lg" mb={4} pl={2}>
        {title}
      </Text>
      <Text color={"white"} mb={4 } pl={2}>
        {description}
      </Text>
      <Box
        display="flex"
        alignItems="center"
        color="white"
        // ml={1}
        w={"fit-content"}
        // bg="rgb(30, 50, 58)"
        borderRadius="full"
        pl={2}
        pr={4}
        pt={1}
        pb={1}
        cursor="pointer"
        _hover={{ bg: "rgb(30, 40, 48)"  }}
      >
        <Text color="white" mr={2}>
          Get Started
        </Text>
        <FaArrowRightLong />
      </Box>
    </Flex>
 */
const CardList = ({ cards }) => (
  <Flex direction="column" gap="4">
    {cards.map((card, index) => (
      <Card key={index} {...card} />
    ))}
  </Flex>
);

const AllCards = () => {
  // Example data for cards
  const cards = [
    {
      title: "Transcribe",
      description: "Transcribe audio in real-time.",
      imageUrl:
        "https://www.kapwing.com/resources/content/images/2024/02/transcribe-audio-to-text.png",
      link: "/transcribe", // Specify the route for each card
    },
    {
      title: "Summarize",
      description: "Summarize audio in real-time.",
      imageUrl:
        "https://www.shutterstock.com/image-vector/businessman-cartoon-on-paper-sheet-260nw-165416321.jpg",
      link: "/summary", // Specify the route for each card
    },
    {
      title: "Diarize",
      description: "Diarize audio in real-time.",
      imageUrl: "https://img-c.udemycdn.com/course/750x422/4752864_afe0_2.jpg",
      link: "/diarization", // Specify the route for each card
    },
    {
      title: "Q&A",
      description: "Answer questions in real-time.",
      imageUrl:
        "https://cdn.pixabay.com/photo/2017/07/19/16/44/questions-2519654_1280.png",
      link: "/Qna", // Specify the route for each card
    },
  ];

  return (
    <Box p="4">
      <CardList cards={cards} />
    </Box>
  );
};

export default AllCards;
