import { useEffect, useState ,useRef} from "react";
const AnimatedHeading = ({ 
  children, 
  className = '',
  delay = 0,
  staggerDelay = 0,
  as = 'h1',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
{ threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
  );

  const el = containerRef.current;
  if (el) observer.observe(el);

  return () => {
    if (el) observer.unobserve(el);
  };
}, []);


  // Split text by \n to get lines
  const getText = () => {
    if (typeof children === 'string') {
      return children;
    }
    // Handle JSX children with \n
    if (Array.isArray(children)) {
      return children.join('');
    }
    return String(children);
  };
  
  const lines = getText().split('\n').map(line => line.trim()).filter(line => line);

  const Component = as;

  return (
    <Component 
      ref={containerRef} 
      className={className}
      style={{ 
        ...style,
        overflow: 'hidden',
        fontFamily: "'Barlow', sans-serif"
      }}
    >
      {lines.map((line, index) => (
        <span
          key={index}
          className=""
          style={{
            display: 'block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: `opacity 0.7s ease-out ${delay + index * staggerDelay}s, transform 1s ease-out ${delay + index * staggerDelay}s`,
          }}
        >
          {line}
        </span>
      ))}
    </Component>
  );
}; export default AnimatedHeading;