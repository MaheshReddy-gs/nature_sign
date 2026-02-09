import { useEffect, useState ,useRef} from "react";
const FloatUpText = ({ children, delay = 0, duration = 0.8, className = '', style = {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting);
    },
{ threshold: 0.1, rootMargin: "0px 0px 20% 0px" }
  );

  const el = ref.current;
  if (el) observer.observe(el);

  return () => {
    if (el) observer.unobserve(el);
  };
}, []);


  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}; export default FloatUpText;