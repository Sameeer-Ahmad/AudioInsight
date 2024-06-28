// import React, { useState } from 'react';
// import { Box, Button, Input, VStack, FormControl, FormLabel } from '@chakra-ui/react';
// import { useTransform, useSpring } from 'framer-motion';
// import { GoogleGeminiEffect } from './geminiEffect';

// function FileUpload() {
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     uploadFile(file);
//   };

//   const uploadFile = (file) => {
//     setLoading(true);
//     const totalSize = file.size;
//     let uploadedSize = 0;

//     const interval = setInterval(() => {
//       if (uploadedSize < totalSize) {
//         uploadedSize += totalSize / 100; // Simulate progress
//         setProgress((uploadedSize / totalSize) * 100);
//       } else {
//         clearInterval(interval);
//         setLoading(false);
//       }
//     }, 100);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle file submission
//   };

//   return (
//     <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg">
//       <form onSubmit={handleSubmit}>
//         <VStack spacing={4}>
//           <FormControl id="file" isRequired>
//             <FormLabel>Select Audio File</FormLabel>
//             <Input type="file" accept="audio/*" onChange={handleFileChange} />
//           </FormControl>
//           <Button
//             type="submit"
//             colorScheme="blue"
//             isLoading={loading}
//             loadingText="Uploading"
//           >
//             Upload
//           </Button>
//           <Box w="full" h="10" mt={4}>
//             <GoogleGeminiEffect progress={progress} />
//           </Box>
//           <Box>{Math.round(progress)}%</Box>
//         </VStack>
//       </form>
//     </Box>
//   );
// }

// export default FileUpload;
