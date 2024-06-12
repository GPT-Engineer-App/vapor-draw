import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { FaPaintBrush } from "react-icons/fa";

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let painting = false;

    const startPosition = (e) => {
      painting = true;
      draw(e);
    };

    const endPosition = () => {
      painting = false;
      context.beginPath();
    };

    const draw = (e) => {
      if (!painting) return;

      context.lineWidth = brushSize;
      context.lineCap = "round";
      context.strokeStyle = color;

      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startPosition);
      canvas.removeEventListener("mouseup", endPosition);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [color, brushSize]);

  return (
    <Container maxW="full" p={0} m={0} centerContent>
      <Box
        as="canvas"
        ref={canvasRef}
        position="absolute"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        zIndex={0}
      />
      <VStack
        position="absolute"
        top={4}
        left={4}
        spacing={4}
        zIndex={1}
        alignItems="flex-start"
      >
        <Button onClick={onOpen} leftIcon={<FaPaintBrush />}>
          Settings
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Brush Color</FormLabel>
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Brush Size</FormLabel>
              <Select
                value={brushSize}
                onChange={(e) => setBrushSize(e.target.value)}
              >
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;