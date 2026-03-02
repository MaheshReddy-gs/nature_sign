import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import FloatUpText from "./Animations/floatUpText";
import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import CustomButton from "./CustomButton";
import { MapPin, Plane, Building2, GraduationCap, Train, Landmark } from "lucide-react";

const LocationSection = () => {
  const { openModal } = useModal();

  // ════════════════════════════════════════════════════════════
  // CONFIGURATION - Adjust sizes here for mobile & desktop
  // ════════════════════════════════════════════════════════════
  
  // Pin sizing configuration
  const PIN_SIZES = {
    site: { dotSize: 28, iconSize: 18 },
    major: { dotSize: 20, iconSize: 40 },
    minor: { dotSize: 22, iconSize: 40 },
  };

  const PIN_DOT_COLORS = {
    site: "#2F7F90",
    major: "#dc2626",
    minor: "#7c3aed",
  };

  // Animation configuration
  const PIN_ANIMATIONS = {
    site: { scale: [1, 1.13, 1], duration: 2.5 },
    major: { scale: [1.3, 1.3, 1.3], duration: 1.8 },
    minor: { scale: [1, 1, 1], duration: 2.2 },
  };

  // Dialog box configuration (for site pin)
  const DIALOG_CONFIG = {
    minWidth: "120px",
    padding: "16px", // px-4 py-3
    borderRadius: "8px",
    fontSize: "14px",
    logoSize: "100%",
    arrowSize: { x: "10px", y: "10px" },
  };

  // Orange label configuration
  const ORANGE_LABEL_CONFIG = {
    fontSize: "9px",
    padding: "8px 8px", // px-2 py-[2px]
    fontWeight: "800",
    textColor: "#ffffff",
    bgColor: "#E8620A",
    rotation: "2deg",
  };

  // Text sizes for different label types
  const LABEL_FONT_SIZES = {
    road: "9px",
    major: "10px",
    minor: "10px",
  };

  // Mobile-specific sizing
  const MOBILE_TEXT_SIZES = {
    title: "16px",
    description: "13px",
    eta: "12px",
    details: "11px",
  };

  // Desktop-specific sizing
  const DESKTOP_TEXT_SIZES = {
    title: "20px",
    description: "16px",
    eta: "12px",
  };

  // ════════════════════════════════════════════════════════════

  // ── Refs ──
  const desktopMapRef = useRef(null); // desktop map container
  const mapRef = useRef(null);        // mobile map container
  const mapImgRef = useRef(null);
const sectionRef = useRef(null);
const prevRatioRef = useRef(0); // tracks last intersection ratio
  const INITIAL_ZOOM = 1.1;
  const MIN_ZOOM = INITIAL_ZOOM;
  const MAX_ZOOM = 3;
  const ZOOM_THRESHOLD = 1.8;

  // Mobile-only constants
  const MOBILE_SCROLL_RELEASE_EPSILON = 0.02;
  const MOBILE_IMAGE_HEIGHT_MULTIPLIER = 1.28;
  const MOBILE_IMAGE_TOP_SHIFT_RATIO = 0.14;
  const SITE_PIN_X_RATIO = 0.355;

  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef(null);
  const basePanRef = useRef({ x: 0, y: 0 });

  const zoomRef = useRef(INITIAL_ZOOM);
  const panRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const lastTouchDist = useRef(null);
  // Store last midpoint between fingers for focal-point zoom
  const lastTouchMidpoint = useRef(null);

  zoomRef.current = zoom;
  panRef.current = pan;
  isPanningRef.current = isPanning;

  
 
  const pins = [
  {
    id: "site",  // unchanged — site pin has special rendering, no icon lookup
    x: 38, y: 31, type: "site",
    title: "Nature's Sign", label: "Nature's Sign",
    description: "Spanning a carefully designed 30 acres, each premium villa plots crafted to blend seamlessly with both nature and modern living.",
    details: ["2400 sq ft avg plot size", "RERA Approved", "Gated Community"],
    image: "/map/naturesign.jpg",
  },
  {
    id: "airport", x: 70, y: 42, type: "major",
    title: "Kempegowda International Airport", label: "International Airport",
    description: "Kempegowda International Airport is an International airport serving Bengaluru, the capital of the Indian state of Karnataka.",
    eta: "~24km from site",
    image: "/map/airport.webp",
  },
  {
    id: "nature", x: 26, y: 52, type: "major",
    title: "Nandi Hills", label: "nandi hills",
    description: "Nandi Hills is famous for its spectacular sunrises above the clouds, serene atmosphere, and cool climate, serving as a popular weekend getaway near Bangalore for trekking, history, and nature.",
    eta: "~18km from site",
    image: "/map/Nandi Hills.jpg",
  },
  {
    id: "busstand", x: 13.8, y: 31, type: "minor",
    title: "KSRTC Bus Stand", label: "KSRTC<br/> bus stand",
    description: "KSRTC bus stand in Chikkaballapura is located near the city center, serves as a hub for local and regional transport, including frequent services to Kempegowda Bus Station.",
    eta: "~21km from site",
    image: "/map/KSRTC.jpg",
  },
  {
    id: "school", x: 17.5, y: 30.5, type: "minor",
    title: "Government Junior College", label: "Govt Jr.<br/> College",
    description: "The college has an excellent reputation in Karnataka in general and in Bangalore University in particular. The college consistently achieves more than 98% results each year, with many students securing top ranks.",
    eta: "~10km from site",
    image: "/map/Government Junior College.jpg",
  },
  {
    id: "school", x: 19.5, y: 30.5, type: "minor",
    title: "BGS English School", label: "BGS School",
    labelPosition: "top",
    description: "Situated at Agalagurki (Chickballapur) just 20 kms from Bengaluru International Airport, amidst quaint hamlets and country-side ambience.",
    eta: "~9km from site",
    image: "/map/bgs.jpg",
  },
  {
    id: "school", x: 21.4, y: 31.2, type: "minor",
    title: "S.J.C. Institute of Technology", label: "S.J.C. Institute <br/>of technology",
    description: "This esteemed institution, affiliated with VTU Belgaum and accredited by AICTE, is dedicated to nurturing future leaders through its dynamic programs and industry-oriented training.",
    eta: "~6km from site",
    image: "/map/SJC Institute of Technology.jpg",
  },
  {
    id: "hospital", x: 20.3, y: 45.2, type: "minor",
    title: "Sri Sathya Sai Sarala Memorial Hospital", label: "Sri Sathya sai <br/>Sarala Memorial Hospital",
    description: "Sri Sathya Sai Sarla Memorial Hospital in Muddenahalli is highly regarded for offering free, high-quality, and compassionate healthcare services.",
    eta: "~8km from site",
    image: "/map/Sri Sathya Sai Sarala Memorial Hospital.jpg",
  },
  {
    id: "cinema", x: 15, y: 32.3, type: "minor",
    title: "Vani Cinema", label: "Vani Cinema",
    labelAlign: "start",
    description: "Vani Cinema is a local movie theatre that serves as a popular entertainment destination for residents and visitors in the area.",
    eta: "~13km from site",
    image: "/map/Vani Cinema.jpg",
  },
  {
    id: "kmf", x: 27.2, y: 31.3, type: "minor",
    title: "KMF Mega Dairy", label: "KMF Mega Dairy", labelPosition: "top",
    description: "Karnataka Milk Federation (KMF) is the largest cooperative dairy Federation in South India, owned and managed by milk producers of Karnataka State.",
    eta: "~2.5km from site",
    image: "/map/KMF.jpg",
  },
  {
    id: "convention", x: 23.8, y: 49.2, type: "minor",
    title: "Amita Rasa", label: "Amrita Rasa",
    description: "Nestled in the shadows of Nandi Hills, Amitarasa is a space for life's finer moments. A 28-acre expanse on a gentle incline, the property is dotted with stone architecture that draws from the heritage of the region.",
    eta: "~8km from site",
    image: "/map/Amita Rasa.jpg",
  },
  {
    id: "isha", x: 10.3, y: 44.4, type: "minor",
    title: "Isha Foundation", label: "ISHA Foundation",
    description: "Located amidst serene landscapes, the Adiyogi Shiva Temple, established by the Isha Foundation, is a breathtaking 112-foot statue dedicated to Lord Shiva.",
    eta: "~22km from site",
    image: "/map/ISHA.jpg",
  },
  {
    id: "school", x: 29.3, y: 31.3, type: "minor",
    title: "Krishna <br/> School", label: "Krishna <br/> School",
    image: "/map/placeholder.jpg",
  },
  {
    id: "convention", x: 31, y: 31.2, type: "minor",
    title: "Krishna Convention Center", label: "Krishna Convention",
    description: "Krishna Convention Center is the perfect venue that has phenomenal settings for every taste. The area is known for lush gardens a great feature for the bride and groom who loves to commune with nature.",
    eta: "~1.5km from site",
    image: "/map/Krishna.jpg",
  },
  {
    id: "school", x: 33.4, y: 31.3, type: "minor",
    title: "Nagarjuna College of Engineering & Technology", label: "Nagarjuna<br/> college of enginnering",
    image: "/map/Nagarjuna.jpg", labelPosition: "top",
    description: "Nagarjuna College of Engineering & Technology, one of the best engineering colleges in Bangalore offers UG and PG education.",
    eta: "~1.3km from site",
  },
  {
    id: "convention", x: 40.7, y: 45.8, type: "minor",
    title: "Sindhura Conventional Hall", label: "Sindura <br/>Conventional Hall",
    description: "Sindhura Conventional Hall specializes in hosting a variety of events, offering ample space for large gatherings as well as intimate celebrations.",
    eta: "~11km from site",
    image: "/map/sindura.jpg",
  },
  {
    id: "club", x: 36.4, y: 49.8, type: "minor",
    title: "Prestige Golfshire Club", label: "Prestige <br/> Golfshire Club",
    description: "The Prestige Golfshire club is an 18-hole championship Golf course designed by Bob Hunt and maintained and managed by the world's largest golf management company Troon Golf.",
    eta: "~11km from site",
    image: "/map/golfshire.jpg",
  },
  {
    id: "govtoffice", x: 46.2, y: 58.7, type: "minor",
    title: "D C Office, Bengaluru Rural District", label: "D C Office",
    description: "This office serves as the central administrative hub for the district, handling matters related to Devanahalli.",
    eta: "~21km from site",
    image: "/map/D C Office Bengaluru Rural District.jpg",
  },
  {
    id: "factory", x: 42.6, y: 66.1, type: "minor",
    title: "Foxconn", label: "Foxconn",
    description: "Foxconn's 300-acre manufacturing facility in Devanahalli, is a major Apple iPhone production hub with a ₹20,000–₹25,000 crore investment.",
    eta: "~25km from site",
    image: "/map/Foxconn.jpg",
  },
  {
    id: "school", x: 43.6, y: 77.1, type: "minor",
    title: "GITAM Deemed to be University", label: "GITAM<br/>University",
    description: "The GITAM Bengaluru campus spans 45 acres in Nagadenahalli, combining modern infrastructure with a serene, well-connected location near Bengaluru International Airport.",
    eta: "~24km from site",
    image: "/map/GITAM Deemed to be University.jpg",
  },
  {
    id: "school", x: 49, y: 76, type: "minor",
    title: "Amity University", label: "Amity University",
    description: "Amity University, Noida (officially Amity University Uttar Pradesh) is a private university located in Noida, Uttar Pradesh, India.",
    eta: "~22km from site",
    image: "/map/Amity University.jpg",
  },
  {
    id: "orchard", x: 58.7, y: 31.6, type: "minor",
    title: "Brigade Orchards", label: "Brigade Orchards",
    description: "The rich lifestyle in acres of openness is complimented by a world class sport arena comprising of a cricket &amp; football ground with viewing gallery, a school, a proposed medical centre and more.",
    eta: "~14km from site",
    image: "/map/Brigade Orchards.jpg",
  },
  {
    id: "school", x: 60.9, y: 76.3, type: "minor",
    title: "Stonehill International School", label: "Stonehill<br/> Intl. School",
    description: "Stonehill International School is a private, secular, coeducational day and boarding school for students aged three to eighteen. English is the medium of instruction throughout.",
    eta: "~48km from site",
    image: "/map/Stonehill International School.jpg",
  },
  {
    id: "tech", x: 70.6, y: 80.5, type: "minor",
    title: "North Gate Tech Park", label: "Northgate Tech Park",
    description: "High-end multi-tenant SEZ IT office complex and multilevel car park, spread over 2 million sq. ft. with world-class office space and amenities.",
    eta: "~43km from site",
    image: "/map/North Gate Tech Park.jpg",
  },
  {
    id: "mall", x: 80.1, y: 82.8, type: "minor",
    title: "RMZ Galleria Mall", label: "RMZ <br/> Galleria Mall",
    description: "Contemporary enclosed shopping complex with multiple levels of stores & a food court.",
    eta: "~45km from site",
    image: "/map/RMZ.jpg",
  },
  {
    id: "hospital", x: 90.1, y: 89.2, type: "minor",
    title: "Ramaiah Medical College Hospital (RMCH)", label: "MS Ramaiah Hospital",
    description: "Ramaiah Memorial Hospital located in the Garden City of Bengaluru has been recognized as a leading one-stop solution to offer high-quality, patient-centric care.",
    eta: "~57km from site",
    image: "/map/RamaiahMed.jpg",
  },
  {
    id: "tech", x: 91.7, y: 77, type: "minor",
    title: "Manyata Embassy Business Park", label: "Manyata <br/>Tech Park",
    description: "Manyata Embassy Business Park (Manyata Tech Park) is one of India's largest business parks and it hosts major multinational corporations, providing advanced IT infrastructure, hotels, and retail spaces.",
    eta: "~46km from site",
    image: "/map/manyata.jpg",
  },
  {
    id: "mall", x: 91.5, y: 65.9, type: "minor",
    title: "Esteem Mall", label: "Esteem mall",
    description: "Esteem Mall is a popular landmark in North Bengaluru and is home to some of the noted global brands in apparel, lifestyle, digital goods, and much more.",
    eta: "~40km from site",
    image: "/map/Esteem Mall.jpg",
  },
  {
    id: "mall", x: 87.7, y: 72.4, type: "minor",
    title: "Esteem Mall", label: "Esteem Mall",
    description: "Esteem Mall is a popular landmark in North Bengaluru and is home to some of the noted global brands in apparel, lifestyle, digital goods, and much more.",
    eta: "~40km from site",
    image: "/map/Esteem Mall.jpg",
  },
  {
    id: "hospital", x: 82.2, y: 76.3, labelPosition: "top", type: "minor",
    title: "Columbia Asia Hospital", label: "Columbia Asia<br/>Hospital Hebbal",
    description: "Columbia Asia Hospitals known for modern infrastructure, they offer 24/7 emergency care, advanced diagnostics, and specialties like cardiology, oncology, and pediatrics.",
    eta: "~62km from site",
    image: "/map/Columbia Asia Hospital.jpg",
  },
  {
    id: "tech", x: 77.1, y: 71.8, type: "minor",
    title: "Hinduja Ecopolis Tech Park", label: "Ecopolis Tech Park", labelPosition: "top",
    description: "Hinduja Ecopolis offers a perfect blend of sustainable design, advanced infrastructure, and strategic connectivity, making it ideal for IT/ITES companies, startups, and corporate offices.",
    eta: "~31km from site",
    image: "/map/Hinduja Ecopolis Tech Park.jpg",
  },
  {
    id: "police", x: 56.4, labelPosition: "top", y: 42.4, type: "minor",
    title: "Devanahalli Police Station", label: "Police Station",
    description: "Operating under the jurisdiction of the Karnataka State Police, the station is responsible for maintaining public order, preventing and investigating crimes, and ensuring the safety and security of residents and visitors.",
    eta: "~13km from site",
    image: "/map/Devanahalli Police Station.jpg",
  },
  {
    id: "school", x: 61.5, y: 37.8, type: "minor",
    title: "Akash International School", label: "Akash Intl. School",
    description: "Nestled in a pristine and breathtakingly beautiful ambience, AIS is managed by the Akash Education Trust, a dedicated group of professionals committed to Education.",
    eta: "~15km from site",
    image: "/map/akashaSchool.jpg",
  },
  {
    id: "school", x: 61.9, y: 31.5, type: "minor",
    title: "The School For Global Minds", label: "School for <br/>Global minds",
    description: "The school is recognized for its strong academic results, active participation in competitions, and commitment to nurturing talented, confident, and future-ready students.",
    eta: "~14km from site",
    image: "/map/School For Global Minds.jpg",
  },
  {
    id: "tech", x: 67.6, y: 20.9, type: "minor",
    title: "Wipro Limited", label: "Wipro",
    description: "As one of India's top IT firms, it employs over 230,000 people across 65 countries, specializing in AI-powered solutions, cloud computing, data analytics, and digital transformation.",
    eta: "~24km from site",
    image: "/map/Wipro Limited.jpg",
  },
  {
    id: "govtoffice", x: 73, y: 24.8, type: "minor",
    title: "IIDL Financial City", label: "Financial city",
    description: "FCI Infrastructure Development Limited (IIDL) was set up by IFCI Limited (IFCI) as its wholly owned subsidiary in the year 2007 to venture into the real estate and infrastructure sector as an institutional player.",
    eta: "~31km from site",
    image: "/map/IIDL Financial City.jpg",
  },
  {
    id: "aerospace", x: 75.9, y: 33.7, type: "minor",
    title: "Thyssenkrupp Aerospace India Pvt Ltd", label: "Thyssenkrupp<br/>AeroSpace",
    description: "ThyssenKrupp Aerospace India is India's first facility dedicated to aerospace and defense materials offering customized global supply chain solutions.",
    eta: "~24km from site",
    image: "/map/Thyssenkrupp Aerospace India Pvt Ltd.jpg",
  },
  {
    id: "tech", x: 73.4, y: 49.1, type: "minor",
    title: "KIADB Hardware Park", label: "KIADB Hardware Park",
    description: "Hardware Tech Park is a dedicated industrial zone developed by the Karnataka Industrial Areas Development Board (KIADB) offers industrial land, utilities, and support services for many companies.",
    eta: "~31km from site",
    image: "/map/KIADB Hardware Park.jpg",
  },
  {
    id: "school", x: 81.1, y: 43.6, type: "minor",
    title: "Koshys Group Of Institutions", label: "Koshya group of <br/> inst. & Nursing clg",
    description: "KGI has been achieving milestones year after year in every sphere of education viz Academics, Placements, Industry Interaction, Corporate Training, and Extracurricular Activities.",
    eta: "~37km from site",
    image: "/map/Koshys Group Of Institutions.jpg",
  },
  {
    id: "mall", x: 77.4, y: 37, type: "minor",
    title: "Shell India Markets Private Limited", label: "Shell India<br/> Market",
    description: "Shell is a diversified energy company in India with 13,000 employees, and presence in Integrated Gas, Downstream, Power, Renewable and Upstream.",
    eta: "~28km from site",
    image: "/map/Shell India Markets Private Limited.jpg",
  },
  {
    id: "tech", x: 79.7, y: 30.9, type: "minor",
    title: "SAP Labs India", label: "SAP Labs",
    description: "This is the fastest-growing subsidiary and largest R&D center outside Germany, with a massive, sustainable second campus opened in Bengaluru in 2025.",
    eta: "~27km from site",
    image: "/map/SAP Labs India.jpg",
  },
  {
    id: "school", x: 61.7, y: 15.2, type: "minor",
    title: "Chanakya University", label: "Chanakya<br/>University",
    description: "Chanakya University is deeply committed to the creation of a foremost knowledge movement that will harness India's lasting civilizational wisdom to serve society and humanity selflessly.",
    eta: "~19km from site",
    image: "/map/chanakya.jpg", labelPosition: "top",
  },
  {
    id: "tech", x: 59.1, y: 9.6, type: "minor",
    title: "Exide Energy Solutions", label: "Exide energy <br/>Solution",
    description: "Exide Energy designs, develops and manufactures Lithium Ion Cells and Battery Pack solutions for various energy storage applications across the Automotive and Industrial sectors.",
    eta: "~22km from site",
    image: "/map/exide.jpg",
  },
  {
    id: "tech", x: 55.9, y: 8.4, type: "minor",
    title: "Carl Zeiss India Bangalore Pvt Ltd", label: "Zeiss",
    description: "ZEISS in India is headquartered in Bengaluru and present in the fields of Industrial Quality Solutions, Research Microscopy Solutions, Medical Technology.",
    eta: "~22km from site",
    image: "/map/ziess.jpg",
  },
  // road labels — unchanged
  { id: "TADIPATRI", x: 10, y: 23, type: "road", title: "TADIPATRI", label: "TADIPATRI", rotation: 0 },
  { id: "Chikkaballapura", x: 16, y: 43, type: "road", title: "Chikkaballapura", label: "Chikkaballapura", rotation: 0 },
  { id: " elevated expressway nh-44", x: 37, y: 38, type: "road", title: "elevated expressway nh-44", label: "elevated expressway nh-44", rotation: 2 },
  { id: " elevated expressway nh-442", x: 72, y: 75, type: "road", title: "elevated expressway nh-44", label: "elevated expressway nh-44", rotation: 28 },
  { id: "satellite town road", x: 49.5, y: 70, type: "road", title: "satellite town road", label: "satellite town road", rotation: -77.5 },
  { id: "satellite town road2", x: 72, y: 11.8, type: "road", title: "satellite town road", label: "satellite town road", rotation: -26.5 },
  { id: "bommanahalli", x: 54, y: 15, type: "road", title: "bommanahalli", label: "bommanahalli", rotation: 0 },
  { id: "devanahalli town", x: 63, y: 45, type: "road", title: "devanahalli town", label: "devanahalli town", rotation: 0 },
  { id: "yelahanka doddaballapura road", x: 63, y: 88.5, type: "road", title: "yelahanka - doddaballapura road", label: "yelahanka - doddaballapura road", rotation: -5 },
  { id: " doddaballapura ", x: 40, y: 95, type: "road", title: "doddaballapura ", label: "doddaballapura ", rotation: 2 },
  { id: " bengaluru ", x: 95, y: 85, type: "road", title: "bengaluru ", label: "bengaluru ", rotation: 2 },
];
  const resolvedPins = pins.map((pin) => (
    pin.type === "road" ? pin : { ...pin, label: pin.label ?? pin.title }
  ));

  const customIcons = {
  airport:      "/map/icons/AIRPORT.svg",
  busstand:     "/map/icons/BUS_STAND.svg",
  school:       "/map/icons/EDU.svg",
  hospital:     "/map/icons/HOSPITAL.svg",
  cinema:       "/map/icons/CINEMA.svg",
  kmf:          "/map/icons/KMF.svg",
  convention:   "/map/icons/CONVENTION AMIT RASA.svg",
  isha:         "/map/icons/ISHA.svg",
  club:         "/map/icons/CLUB.svg",
  govtoffice:   "/map/icons/GOVT_OFFICE.svg",
  factory:      "/map/icons/FACTORY.svg",
  tech:         "/map/icons/IT_SOFTWARE.svg",
  mall:         "/map/icons/MALLS_MARKET.svg",
  nature:       "/map/icons/NANDI HILL.svg",
  orchard:      "/map/icons/ORCHARD.svg",
  aerospace:    "/map/icons/AEROSPACE.svg",
  police:       "/map/icons/POLICE STATION.svg",
};

  const [activePin, setActivePin] = useState(resolvedPins[0]);
  const [isStripMinimised, setIsStripMinimised] = useState(false);

  const handlePinSelect = useCallback((pin) => {
    setActivePin(pin);
    setIsStripMinimised(false);
  }, []);

  const renderTitleWithLineBreaks = (title) => {
    if (typeof title !== "string") return title;
    const lines = title.split(/<br\s*\/?>/gi);
    return lines.map((line, index) => (
      <Fragment key={`${line}-${index}`}>
        {line}
        {index < lines.length - 1 && <br />}
      </Fragment>
    ));
  };

  const getLabelLayout = (pin) => {
    const position = pin.labelPosition || "bottom";
    const align = pin.labelAlign || "center";

    const textAlign =
      align === "start" ? "left" : align === "end" ? "right" : "center";

    if (position === "top") {
      const transform =
        align === "start"
          ? "translateX(0)"
          : align === "end"
            ? "translateX(-100%)"
            : "translateX(-50%)";
      return {
        style: {
          bottom: "100%",
          left: "50%",
          marginBottom: "3px",
          transform,
          transformOrigin: "bottom center",
          textAlign,
        },
      };
    }

    if (position === "left") {
      const transform =
        align === "start"
          ? "translateY(0)"
          : align === "end"
            ? "translateY(-100%)"
            : "translateY(-50%)";
      return {
        style: {
          right: "100%",
          top: "50%",
          marginRight: "6px",
          transform,
          transformOrigin: "center right",
          textAlign,
        },
      };
    }

    if (position === "right") {
      const transform =
        align === "start"
          ? "translateY(0)"
          : align === "end"
            ? "translateY(-100%)"
            : "translateY(-50%)";
      return {
        style: {
          left: "100%",
          top: "50%",
          marginLeft: "6px",
          transform,
          transformOrigin: "center left",
          textAlign,
        },
      };
    }

    // Default matches the current behavior: bottom + centered
    const transform =
      align === "start"
        ? "translateX(0)"
        : align === "end"
          ? "translateX(-100%)"
          : "translateX(-50%)";
    return {
      style: {
        top: "100%",
        left: "50%",
        marginTop: "3px",
        transform,
        transformOrigin: "top center",
        textAlign,
      },
    };
  };

  // ── Mobile base-pan helpers ──
  const getBasePan = useCallback((frameW, frameH) => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return { x: 0, y: 0 };

    const img = mapImgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return { x: 0, y: 0 };

    const baseContentH = frameH * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
    const baseContentW = (img.naturalWidth / img.naturalHeight) * baseContentH;
    const centeredPanX = (0.5 - SITE_PIN_X_RATIO) * baseContentW;
    const maxX = Math.max(0, (baseContentW - frameW) / 2);

    return {
      x: Math.min(maxX, Math.max(-maxX, centeredPanX)),
      y: 0,
    };
  }, [MOBILE_IMAGE_HEIGHT_MULTIPLIER, SITE_PIN_X_RATIO]);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const basePan = getBasePan(width, height);
    basePanRef.current = basePan;
    // if (zoom <= MIN_ZOOM) {
    //   setPan(basePan);
    //   panRef.current = basePan;
    // }
  }, [zoom, MIN_ZOOM, getBasePan]);

  useEffect(() => {
    const applyBasePan = () => {
      if (zoomRef.current > MIN_ZOOM) return;
      const container = mapRef.current;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      const basePan = getBasePan(width, height);
      basePanRef.current = basePan;
      panRef.current = basePan;
      setPan(basePan);
    };

    const img = mapImgRef.current;
    if (img && !img.complete) {
      img.addEventListener("load", applyBasePan);
    } else {
      applyBasePan();
    }
    window.addEventListener("resize", applyBasePan);
    return () => {
      if (img && !img.complete) img.removeEventListener("load", applyBasePan);
      window.removeEventListener("resize", applyBasePan);
    };
  }, [MIN_ZOOM, getBasePan]);
useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const currentRatio = entry.intersectionRatio;
      const isEntering = currentRatio > prevRatioRef.current;
      const enteredFromTop = isEntering && entry.boundingClientRect.top > 0;

      if (enteredFromTop && currentRatio > 0) {
        // User scrolled down into this section — reset pan
        const container = mapRef.current;
        if (container) {
          const { width, height } = container.getBoundingClientRect();
          const basePan = getBasePan(width, height);
          basePanRef.current = basePan;
          panRef.current = basePan;
          setPan(basePan);
          setZoom(INITIAL_ZOOM);
          zoomRef.current = INITIAL_ZOOM;setActivePin(resolvedPins[0]) ;setIsStripMinimised(false);
        }
      }

      prevRatioRef.current = currentRatio;
    },
    { threshold: [0, 0.05] } // fires as soon as section peeks in
  );

  observer.observe(section);
  return () => observer.disconnect();
}, [getBasePan, INITIAL_ZOOM, MIN_ZOOM]);
  // ── Clamp helpers ──
  const getMapCanvasWidth = () => {
    const img = mapImgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return null;
    const frameH = mapRef.current?.getBoundingClientRect().height || window.innerHeight * 0.7;
    return (img.naturalWidth / img.naturalHeight) * frameH;
  };

  const clampPan = (px, py, z, frameW, frameH) => {
    if (z <= MIN_ZOOM) return basePanRef.current;
    const mapW = getMapCanvasWidth();
    if (mapW) {
      const scaledMapW = mapW * z;
      const maxX = Math.max(0, (scaledMapW - frameW) / 2);
      const maxY = Math.max(0, (frameH * (z - 1)) / 2);
      return {
        x: Math.min(maxX, Math.max(-maxX, px)),
        y: Math.min(maxY, Math.max(-maxY, py)),
      };
    }
    const maxX = Math.max(0, (frameW * (z - 1)) / 2);
    const maxY = Math.max(0, (frameH * (z - 1)) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, px)),
      y: Math.min(maxY, Math.max(-maxY, py)),
    };
  };

  const clampPanMobile = (px, py, z, frameW, frameH) => {
    const img = mapImgRef.current;
    const hasNaturalSize = !!(img && img.naturalWidth && img.naturalHeight);
    const baseContentH = frameH * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
    const topInset = frameH * MOBILE_IMAGE_TOP_SHIFT_RATIO;
    const bottomExtent = baseContentH - topInset;
    let baseContentW;
    if (hasNaturalSize) {
      baseContentW = (img.naturalWidth / img.naturalHeight) * baseContentH;
    } else {
      baseContentW = frameW;
    }
    
    // ── Allow horizontal drag at MIN_ZOOM ──
    if (z <= MIN_ZOOM) {
      const scaledW = baseContentW * z;
      const maxX = Math.max(0, (scaledW - frameW) / 2);
      return {
        x: Math.min(maxX, Math.max(-maxX, px)),
        y: basePanRef.current.y, // Keep Y locked to basePan
      };
    }
    
    const scaledW = baseContentW * z;
    const maxX = Math.max(0, (scaledW - frameW) / 2);
    const minY = frameH - bottomExtent * z;
    const maxY = topInset * z;
    return {
      x: Math.min(maxX, Math.max(-maxX, px)),
      y: Math.min(maxY, Math.max(minY, py)),
    };
  };

  const getMobileVerticalPanBounds = (z, frameH) => {
    if (z <= MIN_ZOOM) return { minY: 0, maxY: 0 };
    const baseContentH = frameH * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
    const topInset = frameH * MOBILE_IMAGE_TOP_SHIFT_RATIO;
    const bottomExtent = baseContentH - topInset;
    return {
      minY: frameH - bottomExtent * z,
      maxY: topInset * z,
    };
  };

  // ══════════════════════════════════════════════════════
  // DESKTOP wheel handler — copied exactly from original desktop version
  // Always preventDefault, plain scroll zooms (deltaY * 0.003)
  // ══════════════════════════════════════════════════════
  const handleWheelDesktop = useCallback((e) => {
    e.preventDefault();
    const container = desktopMapRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const zoomDelta = e.ctrlKey ? e.deltaY * 0.01 : e.deltaY * 0.003;

    const prevZoom = zoomRef.current;
    const prevPan = panRef.current;

    const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevZoom - zoomDelta));
    if (nextZoom === prevZoom) return;

    let newPan;
    if (nextZoom <= MIN_ZOOM) {
      newPan = { x: 0, y: 0 };
    } else {
      const contentX = (mouseX - cx - prevPan.x) / prevZoom;
      const contentY = (mouseY - cy - prevPan.y) / prevZoom;
      const newPanX = (mouseX - cx) - contentX * nextZoom;
      const newPanY = (mouseY - cy) - contentY * nextZoom;
      const maxPanX = (rect.width * (nextZoom - 1)) / 2;
      const maxPanY = (rect.height * (nextZoom - 1)) / 2;
      newPan = {
        x: Math.min(maxPanX, Math.max(-maxPanX, newPanX)),
        y: Math.min(maxPanY, Math.max(-maxPanY, newPanY)),
      };
    }

    zoomRef.current = nextZoom;
    panRef.current = newPan;
    setZoom(nextZoom);
    setPan(newPan);
  }, [MIN_ZOOM, MAX_ZOOM]);

  // ══════════════════════════════════════════════════════
  // MOBILE wheel handler — smart scroll-release version
  // ══════════════════════════════════════════════════════
  const handleWheelMobile = useCallback((e) => {
    const container = mapRef.current;
    if (!container) return;
    const currentZoom = zoomRef.current;
    const currentPan = panRef.current;
    const { width, height } = container.getBoundingClientRect();

    if (currentZoom <= MIN_ZOOM) return;

    const maxY = Math.max(0, (height * (currentZoom - 1)) / 2);
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;
    const atTopEdge = currentPan.y >= maxY - 0.5;
    const atBottomEdge = currentPan.y <= -maxY + 0.5;
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);

    if (!isHorizontalScroll) {
      if (scrollingUp && atTopEdge) return;
      if (scrollingDown && atBottomEdge) return;
    }

    e.preventDefault();

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    if (e.ctrlKey) {
      const zoomDelta = e.deltaY * 0.01;
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, currentZoom - zoomDelta));
      if (nextZoom === currentZoom) return;
      let newPan;
      if (nextZoom <= MIN_ZOOM) {
  newPan = clampPanMobile(panRef.current.x, panRef.current.y, MIN_ZOOM, width, height);

      } else {
        const contentX = (mouseX - cx - currentPan.x) / currentZoom;
        const contentY = (mouseY - cy - currentPan.y) / currentZoom;
        const newPanX = (mouseX - cx) - contentX * nextZoom;
        const newPanY = (mouseY - cy) - contentY * nextZoom;
        const maxPanX = (rect.width * (nextZoom - 1)) / 2;
        const maxPanY = (rect.height * (nextZoom - 1)) / 2;
        newPan = {
          x: Math.min(maxPanX, Math.max(-maxPanX, newPanX)),
          y: Math.min(maxPanY, Math.max(-maxPanY, newPanY)),
        };
      }
      zoomRef.current = nextZoom;
      panRef.current = newPan;
      setZoom(nextZoom);
      setPan(newPan);
    } else {
      if (currentZoom <= MIN_ZOOM) {
        if (panRef.current.x !== basePanRef.current.x || panRef.current.y !== basePanRef.current.y) {
          panRef.current = basePanRef.current;
          setPan(basePanRef.current);
        }
        return;
      }
      const newPan = clampPan(
        currentPan.x - e.deltaX,
        currentPan.y - e.deltaY,
        currentZoom, width, height
      );
      panRef.current = newPan;
      setPan(newPan);
    }
  }, [MIN_ZOOM, MAX_ZOOM]);

  const getTouchDist = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Helper: get midpoint of two touches relative to container
  const getTouchMidpoint = (touches, rect) => {
    return {
      x: ((touches[0].clientX + touches[1].clientX) / 2) - rect.left,
      y: ((touches[0].clientY + touches[1].clientY) / 2) - rect.top,
    };
  };

  // ── Mouse handlers (desktop drag-to-pan) ──
  const handleMouseDown = useCallback((e) => {
    if (zoomRef.current <= MIN_ZOOM) return;
    isPanningRef.current = true;
    setIsPanning(true);
    panStart.current = { x: e.clientX - panRef.current.x, y: e.clientY - panRef.current.y };
  }, [MIN_ZOOM]);

  const handleMouseMovePan = useCallback((e) => {
    if (!isPanningRef.current || !panStart.current) return;
    const container = desktopMapRef.current || mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const newPan = clampPan(
      e.clientX - panStart.current.x,
      e.clientY - panStart.current.y,
      zoomRef.current, width, height
    );
    panRef.current = newPan;
    setPan(newPan);
  }, []);

  const handleMouseUp = useCallback(() => {
    isPanningRef.current = false;
    setIsPanning(false);
    panStart.current = null;
  }, []);

  // ── Touch handlers (mobile) ──
  const touchStartPos = useRef(null);
  const isMapGesture = useRef(false);

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      setIsStripMinimised(true);
      e.preventDefault();
      isMapGesture.current = true;
      lastTouchDist.current = getTouchDist(e.touches);

      // ── Record initial midpoint for focal-point zoom ──
      const container = mapRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        lastTouchMidpoint.current = getTouchMidpoint(e.touches, rect);
      }
      return;
    }
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchStartPos.current = { x: t.clientX, y: t.clientY };
      panStart.current = { x: t.clientX - panRef.current.x, y: t.clientY - panRef.current.y };
      lastTouchDist.current = null;
      lastTouchMidpoint.current = null;
      isMapGesture.current = false;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    const container = mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();

    if (e.touches.length === 2) {
      setIsStripMinimised(true);
      e.preventDefault();

      const dist = getTouchDist(e.touches);
      const rect = container.getBoundingClientRect();
      const midpoint = getTouchMidpoint(e.touches, rect);

      if (lastTouchDist.current !== null && lastTouchMidpoint.current !== null) {
        const ratio = dist / lastTouchDist.current;
        const prevZ = zoomRef.current;
        const nextZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevZ * ratio));

        let newPan;
       if (nextZ <= MIN_ZOOM) {
  // Preserve current pan instead of snapping to basePan.
  // The first frame of a pinch often has ratio ≈ 1 → nextZ clamps to MIN_ZOOM,
  // which was causing the map to jump back to center before zooming in.
  newPan = clampPanMobile(panRef.current.x, panRef.current.y, MIN_ZOOM, width, height);
} else {
          // ── Focal-point zoom for mobile ──
          // Mobile transformOrigin is "center top", meaning the scale origin is at
          // (containerWidth/2, 0) — NOT (containerWidth/2, containerHeight/2) like desktop.
          // So the "pivot" in container-space is (cx, 0), and pan.x offsets from that pivot.
          // pan.y offsets from top (0), not from center.
          const cx = rect.width / 2;
          const originY = 0; // "center top" means Y origin is 0
          const currentPan = panRef.current;

          // Where in content-space (relative to the scale origin) does the finger midpoint point?
          const contentX = (midpoint.x - cx - currentPan.x) / prevZ;
          const contentY = (midpoint.y - originY - currentPan.y) / prevZ;

          // What pan keeps that content point under the finger midpoint at the new zoom?
          const newPanX = (midpoint.x - cx) - contentX * nextZ;
          const newPanY = (midpoint.y - originY) - contentY * nextZ;

          newPan = clampPanMobile(newPanX, newPanY, nextZ, width, height);
        }

        zoomRef.current = nextZ;
        panRef.current = newPan;
        setZoom(nextZ);
        setPan(newPan);
      }

      lastTouchDist.current = dist;
      lastTouchMidpoint.current = midpoint;
      return;
    }

    if (e.touches.length === 1 && panStart.current) {
      const t = e.touches[0];
      const currentZ = zoomRef.current;
      const isMeaningfullyZoomed = currentZ > MIN_ZOOM + MOBILE_SCROLL_RELEASE_EPSILON;

      if (!isMapGesture.current && touchStartPos.current) {
        const dx = Math.abs(t.clientX - touchStartPos.current.x);
        const dy = Math.abs(t.clientY - touchStartPos.current.y);

        if (dx < 5 && dy < 5) return;

        // ── HORIZONTAL DRAG: Allow at any zoom level ──
        if (dx > dy) {
          isMapGesture.current = true;
          isPanningRef.current = true;
          setIsPanning(true);
          setIsStripMinimised(true);
        }
        // ── VERTICAL DRAG: Only allow if meaningfully zoomed ──
        else if (dy > dx) {
          if (!isMeaningfullyZoomed) {
            isMapGesture.current = false;
            return;
          }

          const { minY, maxY } = getMobileVerticalPanBounds(currentZ, height);
          const fingerMovingUp = t.clientY < touchStartPos.current.y;
          const atTopEdge = panRef.current.y >= maxY - 0.5;
          const atBottomEdge = panRef.current.y <= minY + 0.5;

          if (
            Math.abs(maxY - minY) < 1 ||
            (fingerMovingUp && atBottomEdge) ||
            (!fingerMovingUp && atTopEdge)
          ) {
            isMapGesture.current = false;
            return;
          }

          isMapGesture.current = true;
          isPanningRef.current = true;
          setIsPanning(true);
          setIsStripMinimised(true);
        }
      }

      if (!isMapGesture.current) return;

      if (touchStartPos.current) {
        const dyFromStart = t.clientY - touchStartPos.current.y;
        const movingMostlyVertical = Math.abs(dyFromStart) > Math.abs(t.clientX - touchStartPos.current.x);
        if (movingMostlyVertical) {
          const { minY, maxY } = getMobileVerticalPanBounds(currentZ, height);
          const fingerMovingUp = dyFromStart < 0;
          const atTopEdge = panRef.current.y >= maxY - 0.5;
          const atBottomEdge = panRef.current.y <= minY + 0.5;
          if ((fingerMovingUp && atBottomEdge) || (!fingerMovingUp && atTopEdge)) {
            isMapGesture.current = false;
            isPanningRef.current = false;
            setIsPanning(false);
            return;
          }
        }
      }

      e.preventDefault();
      const newPan = clampPanMobile(
        t.clientX - panStart.current.x,
        t.clientY - panStart.current.y,
        zoomRef.current, width, height
      );
      panRef.current = newPan;
      setPan(newPan);
    }
  }, [
    MIN_ZOOM,
    MAX_ZOOM,
    MOBILE_SCROLL_RELEASE_EPSILON,
    MOBILE_IMAGE_HEIGHT_MULTIPLIER,
    MOBILE_IMAGE_TOP_SHIFT_RATIO,
  ]);

  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length === 0) {
      isPanningRef.current = false;
      isMapGesture.current = false;
      touchStartPos.current = null;
      setIsPanning(false);
      panStart.current = null;
      lastTouchDist.current = null;
      lastTouchMidpoint.current = null;
    } else if (e.touches.length === 1) {
      lastTouchDist.current = null;
      lastTouchMidpoint.current = null;
      const t = e.touches[0];
      panStart.current = { x: t.clientX - panRef.current.x, y: t.clientY - panRef.current.y };
    }
  }, []);

  // ── Desktop attach — original simple wheel only ──
  const attachWheelDesktop = useCallback((node) => {
    if (node) {
      node.addEventListener("wheel", handleWheelDesktop, { passive: false });
      desktopMapRef.current = node;
    }
  }, [handleWheelDesktop]);

  // ── Mobile attach — smart wheel + all touch events ──
  const attachWheelMobile = useCallback((node) => {
    if (node) {
      node.addEventListener("wheel", handleWheelMobile, { passive: false });
      node.addEventListener("touchstart", handleTouchStart, { passive: false });
      node.addEventListener("touchmove", handleTouchMove, { passive: false });
      node.addEventListener("touchend", handleTouchEnd, { passive: true });
      mapRef.current = node;
    }
  }, [handleWheelMobile, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // ── Shared pin renderer ──
  const renderPins = () =>
    resolvedPins.map((pin) => {
      if (pin.type === "road") {
        return (
          <div
            key={pin.id}
            className="pointer-events-none absolute z-[3] whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.08em] text-black [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]"
            style={{
              top: `${pin.y}%`,
              left: `${pin.x}%`,
              transform: `translate(-50%, -50%) scale(${1 / zoom}) rotate(${pin.rotation ?? 0}deg)`,
              transformOrigin: "center center",
            }}
          >
            {renderTitleWithLineBreaks(pin.title)}
          </div>
        );
      }

      const isVisible = pin.type !== "minor" || zoom >= ZOOM_THRESHOLD;
      // const Icon = pinIcons[pin.id] || pinIcons.default;
      const isSite = pin.type === "site";
      const isMajor = pin.type === "major";

      // Use configuration for pin sizing
      const pinType = isSite ? "site" : isMajor ? "major" : "minor";
      const { dotSize, iconSize } = PIN_SIZES[pinType];
      const dotColor = PIN_DOT_COLORS[pinType];
      
      // Use configuration for animations
      const animConfig = PIN_ANIMATIONS[pinType];
      const animateProps = {
        animate: { scale: animConfig.scale },
        transition: { repeat: Infinity, duration: animConfig.duration, ease: "easeInOut" },
      };
      
      const labelLayout = getLabelLayout(pin);

      if (pin.type === "site") {
        return (
          <div
            key={pin.id}
            onClick={() => handlePinSelect(pin)}
            className="absolute z-20 cursor-pointer transition-opacity duration-300 ease-in-out"
            style={{
              top: `${pin.y}%`,
              left: `${pin.x}%`,
              transform: "translate(-50%, -50%)",
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? "auto" : "none",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.13, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="origin-bottom"
            >
              <div
                style={{
                  transform: `scale(${1 / zoom})`,
                  transformOrigin: "bottom center",
                  display: "inline-block",
                }}
              >
                {/* Dialog Box */}
                <div
                  className="felx pointer-events-none absolute bottom-[calc(100%+2px)] left-[50%] z-20 min-w-[120px] rounded-lg bg-white px-4 py-3 text-center shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                  style={{
                    transform: "translateX(-50%)",
                    transformOrigin: "bottom center",
                  }}
                >
                  <img
                    src="/naturesignLogo1.png"
                    alt="Nature's Sign"
                    className="mb-1 w-full object-contain"
                  />
                  <div
                    className="absolute bottom-[-5px] right-[10%] h-0 w-0 -translate-x-1/2 border-x-[10px] border-x-transparent border-t-[10px] border-t-white [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.1))]"
                    style={{ transform: "translateX(-50%)" }}
                  />
                </div>

                {/* Orange Label */}
                <div className="rotate-2 bg-[#E8620A] px-2 py-[2px] text-[9px] font-extrabold text-white inline-block relative top-0">
                  {renderTitleWithLineBreaks(pin.label)}
                </div>
              </div>
            </motion.div>
          </div>
        );
      }

   const isNormalView = zoom <= MIN_ZOOM + 0.01;
   const compactSuffix = isNormalView ? " pin-pulse--compact" : "";
   const rippleEndScale = Math.max(1.2, Math.min(1.85, 0.7 + zoom * 0.42));

const pulseClass = isMajor ? "pin-pulse pin-pulse--major" : "pin-pulse pin-pulse--minor";

      return (
        <div
          key={pin.id}
          onClick={() => handlePinSelect(pin)}
          className="absolute cursor-pointer"
          style={{
            top: `${pin.y}%`,
            left: `${pin.x}%`,
            transform: `translate(-50%, -50%) scale(${1 / zoom})`,
            transformOrigin: "center center",
            opacity: 1,                              // always show outer so ripple is always visible
            pointerEvents: isVisible ? "auto" : "none",
            zIndex: activePin.id === pin.id ? 10 : 5,
          }}
        >
          <motion.div
  {...animateProps}
  className={`relative p-1 ${pulseClass}`}
  style={!isMajor ? { '--ripple-end-scale': rippleEndScale } : undefined}
>
            <div
              className="relative z-10 flex items-center justify-center rounded-full bg-white transition-opacity duration-300 ease-in-out"
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
                opacity: isVisible ? 1 : 0,         // icon fades with zoom, ripple stays
              }}
            >
              {customIcons[pin.id] ? (
                <img
                  src={customIcons[pin.id]}
                  alt={pin.title}
                  style={{ width: iconSize, height: iconSize }}
                  draggable={false}
                />
              ) : (
                <Icon size={iconSize} />
              )}
            </div>
          </motion.div>
          <div
            className="pointer-events-none absolute block whitespace-nowrap text-[10px] text-black transition-opacity duration-300 ease-in-out"
            style={{ ...labelLayout.style, opacity: isVisible ? 1 : 0 }}  // label fades too
          >
            {renderTitleWithLineBreaks(pin.label)}
          </div>
        </div>
      );
    });

  return (
    <section ref={sectionRef} id="locations" className="w-full bg-white">
      <div className="py-16 md:py-14">
        <div className="max-w-7xl mx-auto px6">

          {/* Heading */}
          <div className="text-center mb-10">
            <FloatUpText className="text-[#a1461a] text-center text-xs tracking-[0.2em] uppercase mb-5">
              LOCATION
            </FloatUpText>
          </div>

          {/* ══════════════════════════════════════
              DESKTOP LAYOUT  (hidden on mobile)
          ══════════════════════════════════════ */}
          <FloatUpText className="hidden md:flex w-full justify-center overflow-hidden mt-6 md:mt-10">
            <div className="w-full max-w-7xl gap-3  grid grid-cols-1 md:grid-cols-4">

              {/* LEFT DETAILS */}
              <div className="md:col-span-1 flex flex-col justify-top  gap-3">

                {/* IMAGE */}
                {activePin.image && (
                  <div style={{ width: "100%", overflow: "hidden" }}>
                    <img className=" aspect-square"
                      src={activePin.image}
                      alt={activePin.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}

                {/* TITLE */}
                <h3 style={{ fontSize: DESKTOP_TEXT_SIZES.title, textTransform: "uppercase", color: "#000", fontWeight: 700 }}>
                  {renderTitleWithLineBreaks(activePin.title)}
                </h3>

                {/* DESCRIPTION */}
                {activePin.description && (
                  <p style={{ fontSize: DESKTOP_TEXT_SIZES.description, color: "#374151", lineHeight: "1.625" }}>
                    {activePin.description}
                  </p>
                )}

                {/* ETA */}
                {activePin.eta && (
                  <p style={{ fontSize: DESKTOP_TEXT_SIZES.eta, color: "#16a34a", fontWeight: 600 }}>
                     {activePin.eta}
                  </p>
                )}

              </div>

              {/* MAP */}
              <div
                ref={attachWheelDesktop}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMovePan}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="relative md:col-span-3 w-full aspect-auto overflow-hidden rounded-lg"
                style={{
                  cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default",
                  userSelect: "none",
                }}
              >
                {/* ZOOM + PAN WRAPPER */}
                <div
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: "center center",
                    transition: isPanning ? "none" : "transform 0.1s ease-out",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  {/* IMAGE */}
                  <img
                    src="/map2.svg"
                    alt="Location Map"
                    draggable={false}
                    className="w-full h-full object-contain"
                  />

                  {/* PINS */}
                  {renderPins()}
                </div>

                {/* Zoom hint */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    background: "rgba(0,0,0,0.45)",
                    color: "white",
                    fontSize: "10px",
                    padding: "3px 7px",
                    borderRadius: "4px",
                    pointerEvents: "none",
                  }}
                >
                  {zoom > 1
                    ? `${Math.round(zoom * 100)}% · Scroll to zoom · Drag to pan`
                    : "Scroll to zoom"}
                </div>
              </div>

            </div>
          </FloatUpText>

          {/* ══════════════════════════════════════
              MOBILE LAYOUT  (hidden on desktop)
          ══════════════════════════════════════ */}
          <div className="md:hidden mt-6">
            <div className="relative h-[70vh] w-full overflow-hidden rounded-lg">
              <div
                ref={attachWheelMobile}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMovePan}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="absolute inset-0 overflow-hidden select-none"
                style={{
                  cursor: isPanning ? "grabbing" : "grab",
                  touchAction: "pan-y",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    height: "70vh",
                    width: "auto",
                    transform: `translateX(calc(-50% + ${pan.x}px)) translateY(${pan.y}px) scale(${zoom})`,
                    transformOrigin: "center top",
                    transition: isPanning ? "none" : "transform 0.1s ease-out",
                  }}
                >
                  <img
                    ref={mapImgRef}
                    src="/map2.svg"
                    alt="Location Map"
                    draggable={false}
                    className="ob block w-auto max-w-none"
                    style={{
                      height: "calc(70vh * 1.28)",
                      marginTop: "calc(70vh * -0.14)",
                    }}
                  />
                  <div className="absolute left-0 w-full" style={{
                    top: "calc(70vh * -0.14)",
                    height: "calc(70vh * 1.28)",
                  }}>
                    {renderPins()}
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute right-2 top-2 z-30 rounded bg-black/45 px-[7px] py-[3px] text-[10px] text-white">
                {zoom > 1
                  ? `${Math.round(zoom * 100)}% · Drag to pan`
                  : "Pinch to zoom"}
              </div>

              <motion.div
                key={activePin.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 z-[25] rounded-t-2xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
              >
                <div
                  onClick={() => setIsStripMinimised(m => !m)}
                  className="flex cursor-pointer items-center justify-between px-5 pb-2 pt-3"
                >
                  <div className="h-1 w-9 rounded-[2px] bg-gray-200" />
                  <motion.span
                    animate={{ rotate: isStripMinimised ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm leading-none text-gray-400"
                  >
                    ▼
                  </motion.span>
                </div>

                <motion.div
                  animate={{ height: isStripMinimised ? 0 : "auto", opacity: isStripMinimised ? 0 : 1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 20px 20px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, textTransform: "uppercase", color: "#111", marginBottom: "6px", letterSpacing: "0.05em" }}>
                      {renderTitleWithLineBreaks(activePin.title)}
                    </h3>
                    {activePin.description && (
                      <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6", marginBottom: "8px" }}>
                        {activePin.description}
                      </p>
                    )}
                    {activePin.eta && (
                      <p style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600, marginBottom: "6px" }}>
                        ⏱ {activePin.eta}
                      </p>
                    )}
                    {activePin.details && activePin.details.length > 0 && (
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
                        {activePin.details.map((d, i) => (
                          <span key={i} style={{ background: "#f0fdf4", color: "#166534", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", border: "1px solid #bbf7d0" }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* ✅ BLUE CTA SECTION */}
      <div className="w-full bg-[#2F7F90] py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
          {/* Left Text */}
          <div className="text-center md:text-left max-w-3xl">
            <FloatUpText>
              <h2 className="section-heading text-white mb-4">
                Are you excited about the project?
              </h2>
            </FloatUpText>

            <FloatUpText>
              <p className="text-white atext-base leading-relaxed max-w-xl">
                Don't miss the opportunity to own the property in fast growing
                satellite township of Devanahalli.
              </p>
            </FloatUpText>
          </div>

          {/* Right Button */}
          <FloatUpText>
            <CustomButton
              onClick={() =>
                openModal({ initialValues: { message: "Request Site Visit" } })
              }
            >
              REQUEST SITE VISIT
            </CustomButton>
          </FloatUpText>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

