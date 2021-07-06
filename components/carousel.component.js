import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';


const items = [
  {
    src: "images/homeslider1.png",
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: "images/homeslider2.png",
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: "images/homeslider3.png",
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

const ImgCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src}  className="carouselImg" style={props.style} alt={item.altText} />
        {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
    </Carousel>
  );
}

export default ImgCarousel;