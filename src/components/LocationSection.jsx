import { motion } from "framer-motion";
import { useModal } from "../context/ModalContext";
import FloatUpText from "./Animations/floatUpText";
import { Fragment, useRef, useState, useCallback, useEffect } from "react";
import CustomButton from "./CustomButton";
import { MapPin } from "lucide-react";

const LocationSection = () => {
  const { openModal } = useModal();

  const PIN_SIZES = {
    site: { dotSize: 28, iconSize: 18 },
    major: { dotSize: 20, iconSize: 40 },
    minor: { dotSize: 22, iconSize: 40 },
  };

  const PIN_ANIMATIONS = {
    site: { scale: [1, 1.13, 1], duration: 2.5 },
    major: { scale: [1.3, 1.3, 1.3], duration: 1.8 },
    minor: { scale: [1, 1, 1], duration: 2.2 },
  };

  const DESKTOP_TEXT_SIZES = { title: "20px", description: "16px", eta: "12px" };

  // ── Refs ──
  const desktopMapRef = useRef(null);
  const fullscreenMapRef = useRef(null);
  const mapRef = useRef(null);
  const mapImgRef = useRef(null);
  const newMapImgRef = useRef(null);
  const sectionRef = useRef(null);
  const prevRatioRef = useRef(0);
  const panStart = useRef(null);
  const basePanRef = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1.1);
  const panRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const lastTouchDist = useRef(null);
  const lastTouchMidpoint = useRef(null);
  const touchStartPos = useRef(null);
  const isMapGesture = useRef(false);

  const INITIAL_ZOOM = 1.1;
  const MIN_ZOOM = INITIAL_ZOOM;
  const MAX_ZOOM = 7;
  const ZOOM_THRESHOLD = 1.8;
  const MICRO_ZOOM_THRESHOLD = 2.3;
  const MOBILE_SCROLL_RELEASE_EPSILON = 0.02;
  const MOBILE_IMAGE_HEIGHT_MULTIPLIER = 1.28;
  const MOBILE_IMAGE_TOP_SHIFT_RATIO = 0.14;
  const SITE_PIN_X_RATIO = 0.355;
  const OFFSET_TOP_PX = 83;

  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [pinTopOffset, setPinTopOffset] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePin, setActivePin] = useState(null);
  const [isStripMinimised, setIsStripMinimised] = useState(false);
  const [quickActivePin, setQuickActivePin] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  zoomRef.current = zoom;
  panRef.current = pan;
  isPanningRef.current = isPanning;

  // Escape closes fullscreen
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setIsFullscreen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when fullscreen open
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isFullscreen]);

  const handleNewMapLoad = useCallback(() => {
    const img = newMapImgRef.current;
    if (!img?.naturalWidth || !img?.naturalHeight) return;
    const W = window.innerHeight;
    const H_new = W * (img.naturalHeight / img.naturalWidth);
    setPinTopOffset((OFFSET_TOP_PX / H_new) * 100);
  }, []);

  const pins = [
    { legacy: true, id: "site", x: 38, y: 31, type: "site", title: "Nature's Sign", label: "Nature's Sign", description: "Spanning a carefully designed 30 acres, each premium villa plots crafted to blend seamlessly with both nature and modern living.", details: ["2400 sq ft avg plot size", "RERA Approved", "Gated Community"], image: "/map/naturesign.jpg" },
    { legacy: true, id: "airport", x: 70, y: 42, type: "major", title: "Kempegowda International Airport", label: "International Airport", description: "Kempegowda International Airport is an International airport serving Bengaluru, the capital of the Indian state of Karnataka.", eta: "~24km from site", image: "/map/airport.webp" },
    { legacy: true, id: "nature", x: 26, y: 52, type: "major", title: "Nandi Hills", label: "nandi hills", description: "Nandi Hills is famous for its spectacular sunrises above the clouds, serene atmosphere, and cool climate, serving as a popular weekend getaway near Bangalore for trekking, history, and nature.", eta: "~18km from site", image: "/map/Nandi Hills.jpg" },
    { legacy: true, id: "busstand", x: 13.8, y: 31, type: "minor", title: "KSRTC Bus Stand", label: "KSRTC<br/> bus stand", description: "KSRTC bus stand in Chikkaballapura is located near the city center, serves as a hub for local and regional transport, including frequent services to Kempegowda Bus Station.", eta: "~21km from site", image: "/map/KSRTC.jpg" },
    { legacy: true, id: "school", x: 17.5, y: 30.5, type: "minor", title: "Government Junior College", label: "Govt Jr.<br/> College", description: "The college has an excellent reputation in Karnataka in general and in Bangalore University in particular. The college consistently achieves more than 98% results each year, with many students securing top ranks.", eta: "~10km from site", image: "/map/Government Junior College.jpg" },
    { legacy: true, id: "school", x: 19.5, y: 30.5, type: "minor", title: "BGS English School", label: "BGS School", labelPosition: "top", description: "Situated at Agalagurki (Chickballapur) just 20 kms from Bengaluru International Airport, amidst quaint hamlets and country-side ambience.", eta: "~9km from site", image: "/map/bgs.jpg" },
    { legacy: true, id: "school", x: 21.4, y: 31.2, type: "minor", title: "S.J.C. Institute of Technology", label: "S.J.C. Institute <br/>of technology", description: "This esteemed institution, affiliated with VTU Belgaum and accredited by AICTE, is dedicated to nurturing future leaders through its dynamic programs and industry-oriented training.", eta: "~6km from site", image: "/map/SJC Institute of Technology.jpg" },
    { legacy: true, id: "hospital", x: 20.3, y: 45.2, type: "minor", title: "Sri Sathya Sai Sarala Memorial Hospital", label: "Sri Sathya sai <br/>Sarala Memorial Hospital", description: "Sri Sathya Sai Sarla Memorial Hospital in Muddenahalli is highly regarded for offering free, high-quality, and compassionate healthcare services.", eta: "~8km from site", image: "/map/Sri Sathya Sai Sarala Memorial Hospital.jpg" },
    { legacy: true, id: "cinema", x: 15, y: 32.3, type: "minor", title: "Vani Cinema", label: "Vani Cinema", labelAlign: "start", description: "Vani Cinema is a local movie theatre that serves as a popular entertainment destination for residents and visitors in the area.", eta: "~13km from site", image: "/map/Vani Cinema.jpg" },
    { legacy: true, id: "kmf", x: 27.2, y: 31.3, type: "minor", title: "KMF Mega Dairy", label: "KMF Mega Dairy", labelPosition: "top", description: "Karnataka Milk Federation (KMF) is the largest cooperative dairy Federation in South India, owned and managed by milk producers of Karnataka State.", eta: "~2.5km from site", image: "/map/KMF.jpg" },
    { legacy: true, id: "convention", x: 23.8, y: 49.2, type: "minor", title: "Amita Rasa", label: "Amrita Rasa", description: "Nestled in the shadows of Nandi Hills, Amitarasa is a space for life's finer moments. A 28-acre expanse on a gentle incline, the property is dotted with stone architecture that draws from the heritage of the region.", eta: "~8km from site", image: "/map/Amita Rasa.jpg" },
    { legacy: true, id: "isha", x: 10.3, y: 44.4, type: "minor", title: "Isha Foundation", label: "ISHA Foundation", description: "Located amidst serene landscapes, the Adiyogi Shiva Temple, established by the Isha Foundation, is a breathtaking 112-foot statue dedicated to Lord Shiva.", eta: "~22km from site", image: "/map/ISHA.jpg" },
    { legacy: true, id: "convention", x: 29.3, y: 30.3, type: "minor", title: "Krishna Convention Center", label: "Krishna Convention", description: "Krishna Convention Center is the perfect venue that has phenomenal settings for every taste. The area is known for lush gardens a great feature for the bride and groom who loves to commune with nature.", eta: "~1.5km from site", image: "/map/Krishna.jpg" },
    { legacy: true, id: "school", x: 32, y: 30, type: "minor", title: "Nagarjuna College of Engineering & Technology", label: "Nagarjuna<br/> college of enginnering", image: "/map/Nagarjuna.jpg", labelPosition: "top", description: "Nagarjuna College of Engineering & Technology, one of the best engineering colleges in Bangalore offers UG and PG education.", eta: "~1.3km from site" },
    { legacy: true, id: "school", x: 33.9, y: 29.3, type: "minor", title: "Regional College of Management", label: "Regional College<br/> of Management", image: "/map/regional college.jpg", description: "RCM Bangalore is one of the top MBA college in Bangalore, with top notch curriculum and best placements. International faculty and global exposure.", eta: "~0.5km from site" },
    { legacy: true, id: "convention", x: 40.7, y: 45.8, type: "minor", title: "Sindhura Conventional Hall", label: "Sindura <br/>Conventional Hall", description: "Sindhura Conventional Hall specializes in hosting a variety of events, offering ample space for large gatherings as well as intimate celebrations.", eta: "~11km from site", image: "/map/sindura.jpg" },
    { legacy: true, id: "club", x: 36.4, y: 49.8, type: "minor", title: "Prestige Golfshire Club", label: "Prestige <br/> Golfshire Club", description: "The Prestige Golfshire club is an 18-hole championship Golf course designed by Bob Hunt and maintained and managed by the world's largest golf management company Troon Golf.", eta: "~11km from site", image: "/map/golfshire.jpg" },
    { legacy: true, id: "govtoffice", x: 46.2, y: 58.7, type: "minor", title: "D C Office, Bengaluru Rural District", label: "D C Office", description: "This office serves as the central administrative hub for the district, handling matters related to Devanahalli.", eta: "~21km from site", image: "/map/D C Office Bengaluru Rural District.jpg" },
    { legacy: true, id: "toll", x: 59.3, y: 60.3, type: "minor", title: "Nalluru Devanahalli Toll Plaza", label: "Toll Plaza", description: "The Nalluru Devanahalli toll plaza is located at the 34.15 km Doddaballapur bypass to Hoskotestretch.", eta: "~20km from site", image: "/map/Nalluru Devanahalli Toll Plaza.jpg" },
    { legacy: true, id: "factory", x: 42.6, y: 66.1, type: "minor", title: "Foxconn", label: "Foxconn", description: "Foxconn's 300-acre manufacturing facility in Devanahalli, is a major Apple iPhone production hub with a ₹20,000–₹25,000 crore investment.", eta: "~25km from site", image: "/map/Foxconn.jpg" },
    { legacy: true, id: "school", x: 43.6, y: 77.1, type: "minor", title: "GITAM Deemed to be University", label: "GITAM<br/>University", description: "The GITAM Bengaluru campus spans 45 acres in Nagadenahalli, combining modern infrastructure with a serene, well-connected location near Bengaluru International Airport.", eta: "~24km from site", image: "/map/GITAM Deemed to be University.jpg" },
    { legacy: true, id: "school", x: 49, y: 76, type: "minor", title: "Amity University", label: "Amity University", description: "Amity University, Noida (officially Amity University Uttar Pradesh) is a private university located in Noida, Uttar Pradesh, India.", eta: "~22km from site", image: "/map/Amity University.jpg" },
    { legacy: true, id: "orchard", x: 58.7, y: 31.6, type: "minor", title: "Brigade Orchards", label: "Brigade Orchards", description: "The rich lifestyle in acres of openness is complimented by a world class sport arena comprising of a cricket &amp; football ground with viewing gallery, a school, a proposed medical centre and more.", eta: "~14km from site", image: "/map/Brigade Orchards.jpg" },
    { legacy: true, id: "school", x: 60.9, y: 76.3, type: "minor", title: "Stonehill International School", label: "Stonehill<br/> Intl. School", description: "Stonehill International School is a private, secular, coeducational day and boarding school for students aged three to eighteen. English is the medium of instruction throughout.", eta: "~48km from site", image: "/map/Stonehill International School.jpg" },
    { legacy: true, id: "tech", x: 70.6, y: 80.5, type: "minor", title: "North Gate Tech Park", label: "Northgate Tech Park", description: "High-end multi-tenant SEZ IT office complex and multilevel car park, spread over 2 million sq. ft. with world-class office space and amenities.", eta: "~43km from site", image: "/map/North Gate Tech Park.jpg" },
    { legacy: true, id: "mall", x: 80.1, y: 82.8, type: "minor", title: "RMZ Galleria Mall", label: "RMZ <br/> Galleria Mall", description: "Contemporary enclosed shopping complex with multiple levels of stores & a food court.", eta: "~45km from site", image: "/map/RMZ.jpg" },
    { legacy: true, id: "hospital", x: 90.1, y: 89.2, type: "minor", title: "Ramaiah Medical College Hospital (RMCH)", label: "MS Ramaiah Hospital", description: "Ramaiah Memorial Hospital located in the Garden City of Bengaluru has been recognized as a leading one-stop solution to offer high-quality, patient-centric care.", eta: "~57km from site", image: "/map/RamaiahMed.jpg" },
    { legacy: true, id: "tech", x: 91.7, y: 77, type: "minor", title: "Manyata Embassy Business Park", label: "Manyata <br/>Tech Park", description: "Manyata Embassy Business Park (Manyata Tech Park) is one of India's largest business parks and it hosts major multinational corporations, providing advanced IT infrastructure, hotels, and retail spaces.", eta: "~46km from site", image: "/map/manyata.jpg" },
    { legacy: true, id: "mall", x: 91.5, y: 65.9, type: "minor", title: "Elements Mall", label: "Elements Mall", description: "Elements Mall is a popular landmark in North Bengaluru and is home to some of the noted global brands in apparel, lifestyle, digital goods, and much more.", eta: "~40km from site", image: "/map/elements.jpg" },
    { legacy: true, id: "mall", x: 87.7, y: 72.4, type: "minor", title: "Esteem Mall", label: "Esteem Mall", description: "Esteem Mall is a popular landmark in North Bengaluru and is home to some of the noted global brands in apparel, lifestyle, digital goods, and much more.", eta: "~40km from site", image: "/map/Esteem Mall.jpg" },
    { legacy: true, id: "hospital", x: 82.2, y: 76.3, labelPosition: "top", type: "minor", title: "Columbia Asia Hospital", label: "Columbia Asia<br/>Hospital Hebbal", description: "Columbia Asia Hospitals known for modern infrastructure, they offer 24/7 emergency care, advanced diagnostics, and specialties like cardiology, oncology, and pediatrics.", eta: "~62km from site", image: "/map/Columbia Asia Hospital.jpg" },
    { legacy: true, id: "tech", x: 77.1, y: 71.8, type: "minor", title: "Hinduja Ecopolis Tech Park", label: "Ecopolis Tech Park", labelPosition: "top", description: "Hinduja Ecopolis offers a perfect blend of sustainable design, advanced infrastructure, and strategic connectivity, making it ideal for IT/ITES companies, startups, and corporate offices.", eta: "~31km from site", image: "/map/Hinduja Ecopolis Tech Park.jpg" },
    { legacy: true, id: "police", x: 56.4, labelPosition: "top", y: 42.4, type: "minor", title: "Devanahalli Police Station", label: "Police Station", description: "Operating under the jurisdiction of the Karnataka State Police, the station is responsible for maintaining public order, preventing and investigating crimes, and ensuring the safety and security of residents and visitors.", eta: "~13km from site", image: "/map/Devanahalli Police Station.jpg" },
    { legacy: true, id: "school", x: 61.5, y: 37.8, type: "minor", title: "Akash International School", label: "Akash Intl. School", description: "Nestled in a pristine and breathtakingly beautiful ambience, AIS is managed by the Akash Education Trust, a dedicated group of professionals committed to Education.", eta: "~15km from site", image: "/map/akashaSchool.jpg" },
    { legacy: true, id: "hospital", x: 62.5, y: 42.8, type: "minor", title: "Akash Super Speciality Hospital", label: "Akash Hospital", description: "Akash Hospital redefine healthcare by combining expertise, advanced technology, and a deep commitment to each patient.", eta: "~15km from site", image: "/map/Akash Super Speciality Hospital.jpg" },
    { legacy: true, id: "school", x: 61.9, y: 31.5, type: "minor", title: "The School For Global Minds", label: "School for <br/>Global minds", description: "The school is recognized for its strong academic results, active participation in competitions, and commitment to nurturing talented, confident, and future-ready students.", eta: "~14km from site", image: "/map/School For Global Minds.jpg" },
    { legacy: true, id: "tech", x: 67.6, y: 20.9, type: "minor", title: "Wipro Limited", label: "Wipro", description: "As one of India's top IT firms, it employs over 230,000 people across 65 countries, specializing in AI-powered solutions, cloud computing, data analytics, and digital transformation.", eta: "~24km from site", image: "/map/Wipro Limited.jpg" },
    { legacy: true, id: "govtoffice", x: 73, y: 24.8, type: "minor", title: "IIDL Financial City", label: "Financial city", description: "FCI Infrastructure Development Limited (IIDL) was set up by IFCI Limited (IFCI) as its wholly owned subsidiary in the year 2007 to venture into the real estate and infrastructure sector as an institutional player.", eta: "~31km from site", image: "/map/IIDL Financial City.jpg" },
    { legacy: true, id: "aerospace", x: 75.9, y: 33.7, type: "minor", title: "Thyssenkrupp Aerospace India Pvt Ltd", label: "Thyssenkrupp<br/>AeroSpace", description: "ThyssenKrupp Aerospace India is India's first facility dedicated to aerospace and defense materials offering customized global supply chain solutions.", eta: "~24km from site", image: "/map/Thyssenkrupp Aerospace India Pvt Ltd.jpg" },
    { legacy: true, id: "tech", x: 73.4, y: 49.1, type: "minor", title: "KIADB Hardware Park", label: "KIADB Hardware Park", description: "Hardware Tech Park is a dedicated industrial zone developed by the Karnataka Industrial Areas Development Board (KIADB) offers industrial land, utilities, and support services for many companies.", eta: "~31km from site", image: "/map/KIADB Hardware Park.jpg" },
    { legacy: true, id: "school", x: 81.1, y: 43.6, type: "minor", title: "Koshys Group Of Institutions", label: "Koshya group of <br/> inst. & Nursing clg", description: "KGI has been achieving milestones year after year in every sphere of education viz Academics, Placements, Industry Interaction, Corporate Training, and Extracurricular Activities.", eta: "~37km from site", image: "/map/Koshys Group Of Institutions.jpg" },
    { legacy: true, id: "mall", x: 77.4, y: 37, type: "minor", title: "Shell India Markets Private Limited", label: "Shell India<br/> Market", description: "Shell is a diversified energy company in India with 13,000 employees, and presence in Integrated Gas, Downstream, Power, Renewable and Upstream.", eta: "~28km from site", image: "/map/Shell India Markets Private Limited.jpg" },
    { legacy: true, id: "tech", x: 79.7, y: 30.9, type: "minor", title: "SAP Labs India", label: "SAP Labs", description: "This is the fastest-growing subsidiary and largest R&D center outside Germany, with a massive, sustainable second campus opened in Bengaluru in 2025.", eta: "~27km from site", image: "/map/SAP Labs India.jpg" },
    { legacy: true, id: "school", x: 61.7, y: 15.2, type: "minor", title: "Chanakya University", label: "Chanakya<br/>University", description: "Chanakya University is deeply committed to the creation of a foremost knowledge movement that will harness India's lasting civilizational wisdom to serve society and humanity selflessly.", eta: "~19km from site", image: "/map/chanakya.jpg", labelPosition: "top" },
    { legacy: true, id: "factory", x: 59.1, y: 9.6, type: "minor", title: "Exide Energy Solutions", label: "Exide energy <br/>Solution", description: "Exide Energy designs, develops and manufactures Lithium Ion Cells and Battery Pack solutions for various energy storage applications across the Automotive and Industrial sectors.", eta: "~22km from site", image: "/map/exide.png" },
    { legacy: true, id: "tech", x: 55.9, y: 8.4, type: "minor", title: "Carl Zeiss India Bangalore Pvt Ltd", label: "Zeiss", description: "ZEISS in India is headquartered in Bengaluru and present in the fields of Industrial Quality Solutions, Research Microscopy Solutions, Medical Technology.", eta: "~22km from site", image: "/map/zeiss.jpg" },
    { legacy: true, id: "mall", x: 51, y: 35.7, image: "/map/D Mart.jpg", type: "minor", title: "D Mart", labelPosition: "right", description: "DMart Devanahalli is a well-known supermarket It offers a wide range of products, including groceries, fresh fruits and vegetables, household essentials, personal care items, and clothing, all at competitive prices.", eta: "~12km from site" },
    { legacy: true, id: "school", x: 44, y: 31.6, image: "/map/Anantha Vidyaniketana School.jpg", type: "minor", title: "Anantha Vidyaniketana School", labelPosition: "top", description: "The School offers students teaching, environment and infrastructure comparable with the best. Anantha Vidyaniketana is built on the foundation that every child is equally capable of achieving his/her potential.", eta: "~10km from site" },
    { legacy: true, id: "isro", x: 44.5, y: 36.8, type: "minor", title: "ISRO Devanahalli Guest House", label: "ISRO Guest House", description: "ISRO Devanahalli Guest House, conveniently located near Rani Cross (Nandi Cross) in Lalagondanahalli.", eta: "~9km from site", image: "/map/ISRO Devanahalli Guest House.jpg" },
    { legacy: true, id: "hotel", x: 47.3, y: 37.1, type: "minor", title: "Hotel Nandi Upachara", label: "Hotel Nandi<br/>Upachara", description: "Hotel Nandi Upachara is a popular local dining spot known for serving authentic South Indian cuisine in a comfortable and welcoming setting.", eta: "~10km from site", image: "/map/nandhihotel.jpg" },
    // road labels
    { legacy: true, id: "TADIPATRI", x: 10, y: 23, type: "road", title: "TADIPATRI", label: "TADIPATRI", rotation: 0 },
    { legacy: true, id: "Chikkaballapura", x: 16, y: 43, type: "road", title: "Chikkaballapura", label: "Chikkaballapura", rotation: 0 },
    { legacy: true, id: "Byranayakanahalli", x: 18, y: 56, type: "road", title: "Byranayakanahalli", label: "Byranayakanahalli", rotation: 0 },
    { legacy: true, id: "Nandhi Hills Road", x: 40, y: 44, type: "road", title: "Nandhi Hills Road", label: "Nandhi Hills Road", rotation: -20 },
    { legacy: true, id: " elevated expressway nh-44", x: 37, y: 38, type: "road", title: "elevated expressway nh-44", label: "elevated expressway nh-44", rotation: 2 },
    { legacy: true, id: " Beedaganahalli", x: 22, y: 36, type: "road", title: "Beedaganahalli", label: "Beedaganahalli", rotation: 2 },
    { legacy: true, id: " elevated expressway nh-442", x: 72, y: 75, type: "road", title: "elevated expressway nh-44", label: "elevated expressway nh-44", rotation: 28 },
    { legacy: true, id: "satellite town road", x: 49.5, y: 70, type: "road", title: "satellite town road", label: "satellite town road", rotation: -77.5 },
    { legacy: true, id: "satellite town road2", x: 72, y: 11.8, type: "road", title: "satellite town road", label: "satellite town road", rotation: -26.5 },
    { legacy: true, id: "bommanahalli", x: 54, y: 15, type: "road", title: "bommanahalli", label: "bommanahalli", rotation: 0 },
    { legacy: true, id: "devanahalli town", x: 63, y: 47, type: "road", title: "devanahalli town", label: "devanahalli town", rotation: 0 },
    { legacy: true, id: "Billamaranahalli", x: 78, y: 57, type: "road", title: "Billamaranahalli", label: "Billamaranahalli", rotation: 0 },
    { legacy: true, id: "Nagawara", x: 90, y: 57, type: "road", title: "Nagawara", label: "Nagawara", rotation: 0 },
    { legacy: true, id: "yelahanka doddaballapura road", x: 63, y: 88.5, type: "road", title: "yelahanka - doddaballapura road", label: "yelahanka - doddaballapura road", rotation: -5 },
    { legacy: true, id: " doddaballapura ", x: 40, y: 95, type: "road", title: "doddaballapura ", label: "doddaballapura ", rotation: 2 },
    { legacy: true, id: " bengaluru ", x: 95, y: 85, type: "road", title: "bengaluru ", label: "bengaluru ", rotation: -85 },
    // micro
    { id: "police", type: "micro", x: 9.4, y: 33.3, label: "Superintendent <br/>Of Police Office", labelPosition: "top" },
    { id: "nature", type: "micro", x: 11.6, y: 37.1, label: "Glass House Of<br/> Chikkabalapura" },
    { id: "hospital", type: "micro", x: 14.7, y: 45.6, label: "District Hospital Chikkaballapur" },
    { id: "nature", type: "micro", x: 14.6, y: 47.3, label: "Kandavara Kere" },
    { id: "govtoffice", type: "micro", x: 9.4, y: 55.7, label: "House Of Bharatha Rathna <br/> Sir M Visvesvaraya" },
    { id: "hospital", type: "micro", x: 18.6, y: 54.4, labelPosition: "left", label: "Sri Madhusudan Sai<br/> Institute Of Medical Sciences<br/> And Research" },
    { id: "convention", type: "micro", x: 17.7, y: 45.9, label: "IPC Hosanna Full <br/>Gospel Church" },
    { id: "govtoffice", type: "micro", x: 21.2, y: 50.5, label: "House Of Bharatha Rathna <br/> Sir M Visvesvaraya", labelPosition: "top" },
    { id: "club", type: "micro", x: 24, y: 55.3, label: "Sai Krishnan Cricket Stadium" },
    { id: "club", type: "micro", x: 22.7, y: 51.4, label: "Sai Krishnan Cricket Stadium" },
    { id: "govtoffice", type: "micro", x: 28.2, y: 57.2, label: "Nandi Grama Panchayat Office" },
    { id: "convention", type: "micro", x: 31.7, y: 52.7, label: "Karagadamma Devi Temple" },
    { id: "hotel", type: "micro", x: 27.4, y: 40.9, label: "Happy Retreats - KAI" },
    { id: "factory", type: "micro", x: 31.3, y: 46.1, label: "Trinetra Precast" },
    { id: "convention", type: "micro", x: 34.1, y: 49.5, label: "Radha Soami Satsang Beas, Devanahalli" },
    { id: "factory", type: "micro", x: 37.9, y: 54.6, label: "Mist Factory" },
    { id: "orchard", type: "micro", x: 36.8, y: 54.7, label: "Picket Fence The Family Farm" },
    { id: "tech", type: "micro", x: 40.1, y: 70.8, label: "Hyvision India Company" },
    { id: "school", type: "micro", x: 45.9, y: 69.2, label: "Harrow International School Bengaluru" },
    { id: "nature", type: "micro", x: 40.2, y: 46.9, label: "Tatamachanahalli Amanikere" },
    { id: "school", type: "micro", x: 41.9, y: 51.2, label: "Jnanadeepa Residential Academy" },
    { id: "hotel", type: "micro", x: 43.2, y: 49.5, label: "Al Taj Hotel" },
    { id: "orchard", type: "micro", x: 44.4, y: 48.4, label: "Rose Flower Farms" },
    { id: "nature", type: "micro", x: 43.5, y: 46.7, label: "Avati" },
    { id: "nature", type: "micro", x: 49.8, y: 51.1, label: "Devanahalli Kere" },
    { id: "convention", type: "micro", x: 51, y: 54.1, label: "Smriti Mandir" },
    { id: "nature", type: "micro", x: 49.6, y: 55.7, label: "Stepwell" },
    { id: "hotel", type: "micro", x: 50.8, y: 46.7, label: "TAJJ Restaurant Devanahalli (Sajjad)" },
    { id: "hotel", type: "micro", x: 50.4, y: 45, label: "Adyar Ananda Bhavan - A2B" },
    { id: "mall", type: "micro", x: 52.9, y: 44.2, label: "DMart" },
    { id: "school", type: "micro", x: 52.2, y: 37.5, label: "Innovators International School" },
    { id: "club", type: "micro", x: 56.6, y: 27.2, label: "Polanahalli Volleyball Stadium" },
    { id: "tech", type: "micro", x: 58.9, y: 21.5, label: "Carl Zeiss India Bangalore Pvt Ltd (Blue Bird Vision)" },
    { id: "factory", type: "micro", x: 66.6, y: 23.8, label: "Emmvee Energy Private Limited (Unit 5)" },
    { id: "nature", type: "micro", x: 68.9, y: 21.3, label: "Soolibele" },
    { id: "orchard", type: "micro", x: 70.5, y: 29.3, label: "Nalluru Heritage Tamarind Grove (Nalluru Kote)" },
    { id: "govtoffice", type: "micro", x: 55.5, y: 51.1, label: "Tippu's Birth Place" },
    { id: "convention", type: "micro", x: 56.4, y: 53, label: "Srinidhi Vaibhava" },
    { id: "orchard", type: "micro", x: 55.8, y: 58.4, label: "House Of Orchids (HOO)" },
    { id: "hotel", type: "micro", x: 60.3, y: 60.4, label: "Cafe Coffee Day (NH44)" },
    { id: "factory", type: "micro", x: 47.8, y: 90.6, label: "Pondhan Scaffolding Pvt Ltd" },
    { id: "factory", type: "micro", x: 52.4, y: 97.9, label: "ITC Filtrona Limited" },
    { id: "nature", type: "micro", x: 54, y: 98.1, label: "Varadanahalli" },
    { id: "factory", type: "micro", x: 55.3, y: 99, label: "Excelios Tissue" },
    { id: "factory", type: "micro", x: 56.8, y: 98.3, label: "INDO-MIM Limited" },
    { id: "nature", type: "micro", x: 88.4, y: 6, label: "Kolathur" },
    { id: "school", type: "micro", x: 77.5, y: 54.2, label: "CMR University (Lakeside Campus)" },
    { id: "club", type: "micro", x: 80.7, y: 55.7, label: "BCCI Centre Of Excellence (National Cricket Academy)" },
    { id: "school", type: "micro", x: 77, y: 60.4, label: "Delhi Public School Bangalore North" },
    { id: "nature", type: "micro", x: 76.9, y: 62.1, label: "Sathanur" },
    { id: "govtoffice", type: "micro", x: 70.4, y: 66.1, label: "Nadaprabhu Kempegowda Statue, Statue Of Prosperity" },
    { id: "govtoffice", type: "micro", x: 74.5, y: 72.1, label: "BSF Campus" },
    { id: "nature", type: "micro", x: 73.3, y: 73.5, label: "Chikkajala" },
    { id: "hospital", type: "micro", x: 89, y: 68, label: "Eesha Multispeciality Hospital" },
    { id: "nature", type: "micro", x: 86.6, y: 74.2, label: "Rangoli Gardens" },
    { id: "nature", type: "micro", x: 94, y: 72.4, label: "Nagavara Lake" },
    { id: "convention", type: "micro", x: 92.7, y: 79.7, label: "Bethel AG Church" },
    { id: "aerospace", type: "micro", x: 85.2, y: 80.2, label: "Jakkuru Aerodrome" },
    { id: "hospital", type: "micro", x: 82.3, y: 81.2, label: "Sparsh Hospital Yelahanka" },
    { id: "hospital", type: "micro", x: 90.2, y: 87.8, label: "Aster CMI Hospital" },
    { id: "mall", type: "micro", x: 86.1, y: 86.1, label: "Phoenix Mall Of Asia" },
    { id: "nature", type: "micro", x: 80.9, y: 89.4, label: "Yelahanka New Town" },
    { id: "nature", type: "micro", x: 78.3, y: 82.9, label: "Yelahanka" },
    { id: "tech", type: "micro", x: 77.4, y: 84.4, label: "Infosys Limited" },
    { id: "govtoffice", type: "micro", x: 73.4, y: 85.4, label: "BSF Campus" },
    { id: "school", type: "micro", x: 73.9, y: 87.2, label: "Nitte Meenakshi Institute Of Technology" },
    { id: "kmf", type: "micro", x: 69.2, y: 93.5, label: "KMF Cattle Feed Mixing Plant" },
    { id: "school", type: "micro", x: 67.4, y: 85.3, label: "Acharya Rakumjee Ashram And School" },{ id: "school", type: "micro", x: 38.1, y: 53.8, label: "Geethanjali International School" },
{ id: "club", type: "micro", x: 42.8, y: 49.9, label: "Extreme Karts & Adventures" },
{ id: "convention", type: "micro", x: 41.2, y: 49.3, label: "Sri Kalikadevi Choweshwari Temple" },
{ id: "hotel", type: "micro", x: 43, y: 43.5, label: "Udupi Sri Krishna Authana" },
{ id: "hotel", type: "micro", x: 40.5, y: 42.4, label: "New Gharana Family Restaurant" },
{ id: "tech", type: "micro", x: 86.2, y: 57.8, label: "SISA Information Security (SISA SDC)" },
{ id: "school", type: "micro", x: 90, y: 75.8, label: "Presidency College" },
{ id: "school", type: "micro", x: 75.1, y: 92.7, label: "Vishwa Vidyapeeth Takshashil" },
{ id: "govtoffice", type: "micro", x: 54.5, y: 49.9, label: "Devanahalli Fort" },
  ];

  const resolvedPins = pins.map((pin) => (
    pin.type === "road" ? pin : { ...pin, label: pin.label ?? pin.title }
  ));

  // Set initial activePin
  useEffect(() => { setActivePin(resolvedPins[0]); }, []);

  const QUICK_LINK_TITLES = [
    "Kempegowda International Airport", "Nandi Hills", "KMF Mega Dairy",
    "Krishna Convention Center", "SAP Labs India", "Foxconn",
    "Prestige Golfshire Club", "Akash Super Speciality Hospital",
    "Wipro Limited", "Manyata Embassy Business Park",
  ];
  const quickLinks = QUICK_LINK_TITLES.map(title => resolvedPins.find(p => p.title === title)).filter(Boolean);

  const customIcons = {
    airport: "/map/icons/AIRPORT.svg", busstand: "/map/icons/BUS_STAND.svg",
    school: "/map/icons/EDU.svg", hospital: "/map/icons/HOSPITAL.svg",
    cinema: "/map/icons/CINEMA.svg", kmf: "/map/icons/KMF.svg",
    convention: "/map/icons/CONVENTION AMIT RASA.svg", isha: "/map/icons/ISHA.svg",
    club: "/map/icons/CLUB.svg", govtoffice: "/map/icons/GOVT_OFFICE.svg",
    factory: "/map/icons/FACTORY.svg", tech: "/map/icons/IT_SOFTWARE.svg",
    mall: "/map/icons/MALLS_MARKET.svg", nature: "/map/icons/NANDI HILL.svg",
    orchard: "/map/icons/ORCHARD.svg", aerospace: "/map/icons/AIROSPACE.svg",
    police: "/map/icons/POLICE STATION.svg", isro: "/map/icons/ISRO.svg",
    hotel: "/map/icons/HOTEL.svg", toll: "/map/icons/TOLL.svg",
  };

  const handlePinSelect = useCallback((pin) => {
    setActivePin(pin);
    setIsStripMinimised(false);
  }, []);

  const navigateToPin = (pin) => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const container = isMobile ? mapRef.current : (isFullscreen ? fullscreenMapRef.current : desktopMapRef.current);
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const TARGET_ZOOM = 2.4;
    const actualY = pin.legacy ? pinTopOffset + (pin.y / 100) * (100 - pinTopOffset) : pin.y;
    setQuickActivePin(pin);
    setActivePin(pin);
    setIsStripMinimised(false);
    setIsNavigating(true);
    let newPan;
    if (!isMobile) {
      const rawX = -(pin.x / 100 - 0.5) * width * TARGET_ZOOM;
      const rawY = -(actualY / 100 - 0.5) * height * TARGET_ZOOM;
      newPan = clampPan(rawX, rawY, TARGET_ZOOM, width, height);
    } else {
      const imgH = height * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
      const topInset = height * MOBILE_IMAGE_TOP_SHIFT_RATIO;
      const imgRef = mapImgRef.current;
      const imgW = imgRef?.naturalWidth && imgRef?.naturalHeight ? (imgRef.naturalWidth / imgRef.naturalHeight) * imgH : width;
      const rawX = -(pin.x / 100 * imgW - imgW / 2) * TARGET_ZOOM;
      const rawY = height / 2 + topInset * TARGET_ZOOM - (actualY / 100) * imgH * TARGET_ZOOM;
      newPan = clampPanMobile(rawX, rawY, TARGET_ZOOM, width, height);
    }
    setZoom(TARGET_ZOOM); setPan(newPan);
    zoomRef.current = TARGET_ZOOM; panRef.current = newPan;
    setTimeout(() => setIsNavigating(false), 700);
  };

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

  const toTitleCasePreserveBreaks = (text) => {
    if (typeof text !== "string") return text;
    return text.split(/(<br\s*\/?>)/gi).map((part) => {
      if (part.match(/<br\s*\/?>/gi)) return part;
      return part.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }).join("");
  };

  const getLabelLayout = (pin) => {
    const position = pin.labelPosition || "bottom";
    const align = pin.labelAlign || "center";
    const textAlign = align === "start" ? "left" : align === "end" ? "right" : "center";
    if (position === "top") {
      const transform = align === "start" ? "translateX(0)" : align === "end" ? "translateX(-100%)" : "translateX(-50%)";
      return { style: { bottom: "100%", left: "50%", marginBottom: "3px", transform, transformOrigin: "bottom center", textAlign } };
    }
    if (position === "left") {
      const transform = align === "start" ? "translateY(0)" : align === "end" ? "translateY(-100%)" : "translateY(-50%)";
      return { style: { right: "100%", top: "50%", marginRight: "6px", transform, transformOrigin: "center right", textAlign } };
    }
    if (position === "right") {
      const transform = align === "start" ? "translateY(0)" : align === "end" ? "translateY(-100%)" : "translateY(-50%)";
      return { style: { left: "100%", top: "50%", marginLeft: "6px", transform, transformOrigin: "center left", textAlign } };
    }
    const transform = align === "start" ? "translateX(0)" : align === "end" ? "translateX(-100%)" : "translateX(-50%)";
    return { style: { top: "100%", left: "50%", marginTop: "3px", transform, transformOrigin: "top center", textAlign } };
  };

  const getBasePan = useCallback((frameW, frameH) => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return { x: 0, y: 0 };
    const img = mapImgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return { x: 0, y: 0 };
    const baseContentH = frameH * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
    const baseContentW = (img.naturalWidth / img.naturalHeight) * baseContentH;
    const centeredPanX = (0.5 - SITE_PIN_X_RATIO) * baseContentW;
    const maxX = Math.max(0, (baseContentW - frameW) / 2);
    return { x: Math.min(maxX, Math.max(-maxX, centeredPanX)), y: 0 };
  }, [MOBILE_IMAGE_HEIGHT_MULTIPLIER, SITE_PIN_X_RATIO]);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    basePanRef.current = getBasePan(width, height);
  }, [zoom, MIN_ZOOM, getBasePan]);

  useEffect(() => {
    const applyBasePan = () => {
      if (zoomRef.current > MIN_ZOOM) return;
      const container = mapRef.current;
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      const basePan = getBasePan(width, height);
      basePanRef.current = basePan; panRef.current = basePan; setPan(basePan);
    };
    const img = mapImgRef.current;
    if (img && !img.complete) { img.addEventListener("load", applyBasePan); } else { applyBasePan(); }
    window.addEventListener("resize", applyBasePan);
    return () => { if (img && !img.complete) img.removeEventListener("load", applyBasePan); window.removeEventListener("resize", applyBasePan); };
  }, [MIN_ZOOM, getBasePan]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      const currentRatio = entry.intersectionRatio;
      const isEntering = currentRatio > prevRatioRef.current;
      const enteredFromTop = isEntering && entry.boundingClientRect.top > 0;
      if (enteredFromTop && currentRatio > 0) {
        const container = mapRef.current;
        if (container) {
          const { width, height } = container.getBoundingClientRect();
          const basePan = getBasePan(width, height);
          basePanRef.current = basePan; panRef.current = basePan; setPan(basePan);
          setZoom(INITIAL_ZOOM); zoomRef.current = INITIAL_ZOOM;
          setActivePin(resolvedPins[0]); setIsStripMinimised(false); setQuickActivePin(null);
        }
      }
      prevRatioRef.current = currentRatio;
    }, { threshold: [0, 0.05] });
    observer.observe(section);
    return () => observer.disconnect();
  }, [getBasePan, INITIAL_ZOOM, MIN_ZOOM]);

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
      return { x: Math.min(maxX, Math.max(-maxX, px)), y: Math.min(maxY, Math.max(-maxY, py)) };
    }
    const maxX = Math.max(0, (frameW * (z - 1)) / 2);
    const maxY = Math.max(0, (frameH * (z - 1)) / 2);
    return { x: Math.min(maxX, Math.max(-maxX, px)), y: Math.min(maxY, Math.max(-maxY, py)) };
  };

  const clampPanMobile = (px, py, z, frameW, frameH) => {
    const img = mapImgRef.current;
    const hasNaturalSize = !!(img && img.naturalWidth && img.naturalHeight);
    const baseContentH = frameH * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
    const topInset = frameH * MOBILE_IMAGE_TOP_SHIFT_RATIO;
    const bottomExtent = baseContentH - topInset;
    const baseContentW = hasNaturalSize ? (img.naturalWidth / img.naturalHeight) * baseContentH : frameW;
    if (z <= MIN_ZOOM) {
      const scaledW = baseContentW * z;
      const maxX = Math.max(0, (scaledW - frameW) / 2);
      return { x: Math.min(maxX, Math.max(-maxX, px)), y: basePanRef.current.y };
    }
    const scaledW = baseContentW * z;
    const maxX = Math.max(0, (scaledW - frameW) / 2);
    const minY = frameH - bottomExtent * z;
    const maxY = topInset * z;
    return { x: Math.min(maxX, Math.max(-maxX, px)), y: Math.min(maxY, Math.max(minY, py)) };
  };

  const getMobileVerticalPanBounds = (z, frameH) => {
    if (z <= MIN_ZOOM) return { minY: 0, maxY: 0 };
    const baseContentH = frameH * MOBILE_IMAGE_HEIGHT_MULTIPLIER;
    const topInset = frameH * MOBILE_IMAGE_TOP_SHIFT_RATIO;
    const bottomExtent = baseContentH - topInset;
    return { minY: frameH - bottomExtent * z, maxY: topInset * z };
  };

  // Desktop wheel handler — works for both normal and fullscreen via the getContainer callback
  const makeDesktopWheelHandler = useCallback((getContainer) => (e) => {
    e.preventDefault();
    const container = getContainer();
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
      newPan = { x: Math.min(maxPanX, Math.max(-maxPanX, newPanX)), y: Math.min(maxPanY, Math.max(-maxPanY, newPanY)) };
    }
    zoomRef.current = nextZoom; panRef.current = newPan; setZoom(nextZoom); setPan(newPan);
  }, [MIN_ZOOM, MAX_ZOOM]);

  const handleWheelDesktop = useCallback(makeDesktopWheelHandler(() => desktopMapRef.current), [makeDesktopWheelHandler]);
  const handleWheelFullscreen = useCallback(makeDesktopWheelHandler(() => fullscreenMapRef.current), [makeDesktopWheelHandler]);

  const handleWheelMobile = useCallback((e) => {
    const container = mapRef.current;
    if (!container) return;
    const currentZoom = zoomRef.current;
    const currentPan = panRef.current;
    const { width, height } = container.getBoundingClientRect();
    if (currentZoom <= MIN_ZOOM) return;
    const maxY = Math.max(0, (height * (currentZoom - 1)) / 2);
    const atTopEdge = currentPan.y >= maxY - 0.5;
    const atBottomEdge = currentPan.y <= -maxY + 0.5;
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY);
    if (!isHorizontalScroll) {
      if (e.deltaY < 0 && atTopEdge) return;
      if (e.deltaY > 0 && atBottomEdge) return;
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
        newPan = { x: Math.min(maxPanX, Math.max(-maxPanX, newPanX)), y: Math.min(maxPanY, Math.max(-maxPanY, newPanY)) };
      }
      zoomRef.current = nextZoom; panRef.current = newPan; setZoom(nextZoom); setPan(newPan);
    } else {
      if (currentZoom <= MIN_ZOOM) {
        if (panRef.current.x !== basePanRef.current.x || panRef.current.y !== basePanRef.current.y) { panRef.current = basePanRef.current; setPan(basePanRef.current); }
        return;
      }
      const newPan = clampPan(currentPan.x - e.deltaX, currentPan.y - e.deltaY, currentZoom, width, height);
      panRef.current = newPan; setPan(newPan);
    }
  }, [MIN_ZOOM, MAX_ZOOM]);

  const getTouchDist = (touches) => Math.sqrt((touches[0].clientX - touches[1].clientX) ** 2 + (touches[0].clientY - touches[1].clientY) ** 2);
  const getTouchMidpoint = (touches, rect) => ({ x: ((touches[0].clientX + touches[1].clientX) / 2) - rect.left, y: ((touches[0].clientY + touches[1].clientY) / 2) - rect.top });

  const handleMouseDown = useCallback((e) => {
    if (zoomRef.current <= MIN_ZOOM) return;
    isPanningRef.current = true; setIsPanning(true);
    panStart.current = { x: e.clientX - panRef.current.x, y: e.clientY - panRef.current.y };
  }, [MIN_ZOOM]);

  const handleMouseMovePan = useCallback((e) => {
    if (!isPanningRef.current || !panStart.current) return;
    const container = fullscreenMapRef.current || desktopMapRef.current || mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const newPan = clampPan(e.clientX - panStart.current.x, e.clientY - panStart.current.y, zoomRef.current, width, height);
    panRef.current = newPan; setPan(newPan);
  }, []);

  const handleMouseUp = useCallback(() => { isPanningRef.current = false; setIsPanning(false); panStart.current = null; }, []);

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2) {
      setIsStripMinimised(true); e.preventDefault(); isMapGesture.current = true;
      lastTouchDist.current = getTouchDist(e.touches);
      const container = mapRef.current;
      if (container) { const rect = container.getBoundingClientRect(); lastTouchMidpoint.current = getTouchMidpoint(e.touches, rect); }
      return;
    }
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchStartPos.current = { x: t.clientX, y: t.clientY };
      panStart.current = { x: t.clientX - panRef.current.x, y: t.clientY - panRef.current.y };
      lastTouchDist.current = null; lastTouchMidpoint.current = null; isMapGesture.current = false;
    }
  }, []);

  const handleTouchMove = useCallback((e) => {
    const container = mapRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    if (e.touches.length === 2) {
      setIsStripMinimised(true); e.preventDefault();
      const dist = getTouchDist(e.touches);
      const rect = container.getBoundingClientRect();
      const midpoint = getTouchMidpoint(e.touches, rect);
      if (lastTouchDist.current !== null && lastTouchMidpoint.current !== null) {
        const ratio = dist / lastTouchDist.current;
        const prevZ = zoomRef.current;
        const nextZ = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevZ * ratio));
        let newPan;
        if (nextZ <= MIN_ZOOM) {
          newPan = clampPanMobile(panRef.current.x, panRef.current.y, MIN_ZOOM, width, height);
        } else {
          const cx = rect.width / 2;
          const originY = 0;
          const cp = panRef.current;
          const contentX = (midpoint.x - cx - cp.x) / prevZ;
          const contentY = (midpoint.y - originY - cp.y) / prevZ;
          newPan = clampPanMobile((midpoint.x - cx) - contentX * nextZ, (midpoint.y - originY) - contentY * nextZ, nextZ, width, height);
        }
        zoomRef.current = nextZ; panRef.current = newPan; setZoom(nextZ); setPan(newPan);
      }
      lastTouchDist.current = dist; lastTouchMidpoint.current = midpoint;
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
        if (dx > dy) { isMapGesture.current = true; isPanningRef.current = true; setIsPanning(true); setIsStripMinimised(true); }
        else if (dy > dx) {
          if (!isMeaningfullyZoomed) { isMapGesture.current = false; return; }
          const { minY, maxY } = getMobileVerticalPanBounds(currentZ, height);
          const fingerMovingUp = t.clientY < touchStartPos.current.y;
          const atTopEdge = panRef.current.y >= maxY - 0.5;
          const atBottomEdge = panRef.current.y <= minY + 0.5;
          if (Math.abs(maxY - minY) < 1 || (fingerMovingUp && atBottomEdge) || (!fingerMovingUp && atTopEdge)) { isMapGesture.current = false; return; }
          isMapGesture.current = true; isPanningRef.current = true; setIsPanning(true); setIsStripMinimised(true);
        }
      }
      if (!isMapGesture.current) return;
      if (touchStartPos.current) {
        const dyFromStart = t.clientY - touchStartPos.current.y;
        if (Math.abs(dyFromStart) > Math.abs(t.clientX - touchStartPos.current.x)) {
          const { minY, maxY } = getMobileVerticalPanBounds(currentZ, height);
          const fingerMovingUp = dyFromStart < 0;
          if ((fingerMovingUp && panRef.current.y <= minY + 0.5) || (!fingerMovingUp && panRef.current.y >= maxY - 0.5)) {
            isMapGesture.current = false; isPanningRef.current = false; setIsPanning(false); return;
          }
        }
      }
      e.preventDefault();
      const newPan = clampPanMobile(t.clientX - panStart.current.x, t.clientY - panStart.current.y, zoomRef.current, width, height);
      panRef.current = newPan; setPan(newPan);
    }
  }, [MIN_ZOOM, MAX_ZOOM, MOBILE_SCROLL_RELEASE_EPSILON, MOBILE_IMAGE_HEIGHT_MULTIPLIER, MOBILE_IMAGE_TOP_SHIFT_RATIO]);

  const handleTouchEnd = useCallback((e) => {
    if (e.touches.length === 0) { isPanningRef.current = false; isMapGesture.current = false; touchStartPos.current = null; setIsPanning(false); panStart.current = null; lastTouchDist.current = null; lastTouchMidpoint.current = null; }
    else if (e.touches.length === 1) { lastTouchDist.current = null; lastTouchMidpoint.current = null; const t = e.touches[0]; panStart.current = { x: t.clientX - panRef.current.x, y: t.clientY - panRef.current.y }; }
  }, []);

  const attachWheelDesktop = useCallback((node) => {
    if (node) { node.addEventListener("wheel", handleWheelDesktop, { passive: false }); desktopMapRef.current = node; }
  }, [handleWheelDesktop]);

  const attachWheelFullscreen = useCallback((node) => {
    if (node) { node.addEventListener("wheel", handleWheelFullscreen, { passive: false }); fullscreenMapRef.current = node; }
  }, [handleWheelFullscreen]);

  const attachWheelMobile = useCallback((node) => {
    if (node) {
      node.addEventListener("wheel", handleWheelMobile, { passive: false });
      node.addEventListener("touchstart", handleTouchStart, { passive: false });
      node.addEventListener("touchmove", handleTouchMove, { passive: false });
      node.addEventListener("touchend", handleTouchEnd, { passive: true });
      mapRef.current = node;
    }
  }, [handleWheelMobile, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // ── Pin renderer (unchanged from working version) ──
  const renderPins = (legacyOnly) =>
    resolvedPins
      .filter(pin => legacyOnly ? pin.legacy === true : pin.legacy !== true)
      .map(pin => {
        if (pin.type === "road") {
          return (
            <div key={pin.id} className="pointer-events-none absolute z-[3] whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.08em] text-black [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]"
              style={{ top: `${pin.y}%`, left: `${pin.x}%`, transform: `translate(-50%, -50%) scale(${1 / zoom}) rotate(${pin.rotation ?? 0}deg)`, transformOrigin: "center center" }}>
              {renderTitleWithLineBreaks(pin.title)}
            </div>
          );
        }
        const isVisible = pin.type !== "minor" || zoom >= ZOOM_THRESHOLD;
        const isSite = pin.type === "site";
        const isMajor = pin.type === "major";
        const pinType = isSite ? "site" : isMajor ? "major" : "minor";
        const { dotSize, iconSize } = PIN_SIZES[pinType];
        const animConfig = PIN_ANIMATIONS[pinType];
        const animateProps = { animate: { scale: animConfig.scale }, transition: { repeat: Infinity, duration: animConfig.duration, ease: "easeInOut" } };
        const labelLayout = getLabelLayout(pin);
        const isQuickActive = !!(quickActivePin && quickActivePin.title === pin.title && quickActivePin.x === pin.x && quickActivePin.y === pin.y);

        if (pin.type === "micro") {
          const isMicroVisible = zoom >= MICRO_ZOOM_THRESHOLD;
          return (
            <div key={`${pin.id}-${pin.x}-${pin.y}`} className="absolute pointer-events-none"
              style={{ top: `${pin.y}%`, left: `${pin.x}%`, transform: `translate(-50%, -50%) scale(${1 / zoom})`, transformOrigin: "center center", opacity: isMicroVisible ? 1 : 0, transition: "opacity 0.25s ease", zIndex: 3 }}>
              {customIcons[pin.id] ? (
  <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
    <img src={customIcons[pin.id]} alt="" style={{ width: 10, height: 10 }} draggable={false} />
  </div>
) : (
  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#555", margin: "0 auto" }} />
)}
              <div className="pointer-events-none absolute block whitespace-nowrap text-[10px] text-black"
                style={{ ...getLabelLayout(pin).style, textShadow: "0 1px 2px rgba(255,255,255,0.8)", letterSpacing: "0.08em" }}>
                {renderTitleWithLineBreaks(toTitleCasePreserveBreaks(pin.label))}
              </div>
            </div>
          );
        }

        if (pin.type === "site") {
          return (
            <div key={pin.id} onClick={() => handlePinSelect(pin)} className="absolute z-20 cursor-pointer transition-opacity duration-300 ease-in-out"
              style={{ top: `${pin.y}%`, left: `${pin.x}%`, transform: "translate(-50%, -50%)", opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? "auto" : "none" }}>
              <motion.div animate={{ scale: [1, 1.13, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="origin-bottom">
                <div style={{ transform: `scale(${1 / zoom})`, transformOrigin: "bottom center", display: "inline-block" }}>
                  <div className="felx pointer-events-none absolute bottom-[calc(100%+2px)] left-[50%] z-20 min-w-[120px] rounded-lg bg-white px-4 py-3 text-center shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
                    style={{ transform: "translateX(-50%)", transformOrigin: "bottom center" }}>
                    <img src="/naturesignLogo1.png" alt="Nature's Sign" className="mb-1 w-full object-contain" />
                    <div className="absolute bottom-[-5px] right-[10%] h-0 w-0 -translate-x-1/2 border-x-[10px] border-x-transparent border-t-[10px] border-t-white [filter:drop-shadow(0_2px_2px_rgba(0,0,0,0.1))]" style={{ transform: "translateX(-50%)" }} />
                  </div>
                  <div className="rotate-2 bg-[#E8620A] px-2 py-[2px] text-[9px] font-extrabold text-white inline-block relative top-0">
                    {renderTitleWithLineBreaks(pin.label)}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        }

        const rippleEndScale = Math.max(1.2, Math.min(1.85, 0.7 + zoom * 0.42));
        const pulseClass = isMajor ? "pin-pulse pin-pulse--major" : "pin-pulse pin-pulse--minor";

        return (
          <div key={`${pin.id}-${pin.x}-${pin.y}`} onClick={() => handlePinSelect(pin)} className="absolute cursor-pointer"
            style={{ top: `${pin.y}%`, left: `${pin.x}%`, transform: `translate(-50%, -50%) scale(${1 / zoom})`, transformOrigin: "center center", opacity: 1, pointerEvents: isVisible ? "auto" : "none", zIndex: isQuickActive ? 15 : activePin?.id === pin.id ? 10 : 5 }}>
            <motion.div {...animateProps} className={`relative p-1 ${pulseClass}`} style={!isMajor ? { '--ripple-end-scale': rippleEndScale } : undefined}>
              {isQuickActive && (
                <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeOut" }}
                  style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#f97316", zIndex: 0 }} />
              )}
              <div className="relative z-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${dotSize}px`, height: `${dotSize}px`, background: isQuickActive ? "#f97316" : "white", boxShadow: isQuickActive ? "0 0 0 3px rgba(249,115,22,0.4)" : undefined, opacity: isVisible ? 1 : 0 }}>
                {customIcons[pin.id] ? (
                  <img src={customIcons[pin.id]} alt={pin.title} style={{ width: iconSize, height: iconSize, filter: isQuickActive ? "brightness(0) invert(1)" : undefined }} draggable={false} />
                ) : <MapPin size={iconSize} />}
              </div>
            </motion.div>
            <div className="pointer-events-none absolute block whitespace-nowrap text-[10px] text-black transition-opacity duration-300 ease-in-out"
              style={{ ...labelLayout.style, opacity: isVisible ? 1 : 0 }}>
              {renderTitleWithLineBreaks(toTitleCasePreserveBreaks(pin.label))}
            </div>
          </div>
        );
      });

  const mapTransition = isPanning ? "none" : isNavigating ? "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)" : "transform 0.1s ease-out";

  const QuickLinksStrip = () => (
    <div className="mt-5">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">Quick Navigate</p>
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {quickLinks.map((pin, i) => {
          const isActive = quickActivePin?.title === pin.title && quickActivePin?.x === pin.x;
          const plainLabel = (pin.label ?? pin.title).replace(/<br\s*\/?>/gi, " ");
          return (
            <button key={i} onClick={() => navigateToPin(pin)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-all duration-200"
              style={{ background: isActive ? "#f97316" : "#fff", borderColor: isActive ? "#f97316" : "#d1d5db", color: isActive ? "#fff" : "#374151", boxShadow: isActive ? "0 0 0 3px rgba(249,115,22,0.2)" : "0 1px 3px rgba(0,0,0,0.06)" }}>
              {customIcons[pin.id] && <img src={customIcons[pin.id]} alt="" style={{ width: 13, height: 13, filter: isActive ? "brightness(0) invert(1)" : undefined }} />}
              {plainLabel}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (!activePin) return null;

  return (
    <section ref={sectionRef} id="locations" className="w-full bg-white">
      <div className="py-16 md:py-14">
        <div className="max-w-7xl mx-auto px6">

          <div className="text-center mb-10">
            <FloatUpText className="text-[#a1461a] text-center text-xs tracking-[0.2em] uppercase mb-5">
              LOCATION
            </FloatUpText>
          </div>

          {/* ══════ DESKTOP ══════ */}
          <FloatUpText className="hidden md:flex w-full justify-center overflow-hidden mt-6 md:mt-10">
            <div className="w-full max-w-7xl">
              <div className="gap-3 grid grid-cols-1 md:grid-cols-4">

                {/* LEFT DETAILS */}
                <div className="md:col-span-1 flex flex-col justify-top gap-3">
                  {activePin.image && (
                    <div style={{ width: "100%", overflow: "hidden" }}>
                      <img className="aspect-[5/3]" src={activePin.image} alt={activePin.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <h3 style={{ fontSize: DESKTOP_TEXT_SIZES.title, textTransform: "uppercase", color: "#000", fontWeight: 700 }}>
                    {renderTitleWithLineBreaks(activePin.title)}
                  </h3>
                  {activePin.description && <p style={{ fontSize: DESKTOP_TEXT_SIZES.description, color: "#374151", lineHeight: "1.625" }}>{activePin.description}</p>}
                  {activePin.eta && <p style={{ fontSize: DESKTOP_TEXT_SIZES.eta, color: "#16a34a", fontWeight: 600 }}>{activePin.eta}</p>}
                </div>

                {/* MAP */}
                <div ref={attachWheelDesktop} onMouseDown={handleMouseDown} onMouseMove={handleMouseMovePan} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
                  className="relative md:col-span-3 w-full aspect-auto overflow-hidden rounded-lg"
                  style={{ cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default", userSelect: "none" }}>

                  {/* ZOOM + PAN WRAPPER */}
                  <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: "center center", transition: mapTransition, width: "100%", height: "100%", position: "relative" }}>
                    <img ref={newMapImgRef} onLoad={handleNewMapLoad} src="/map1.svg" alt="Location Map" draggable={false} className="w-full h-full object-contain" />
                    {/* LEGACY PINS */}
                    <div style={{ position: "absolute", top: `${pinTopOffset}%`, left: -4, width: "100%", height: `${100 - pinTopOffset}%`, pointerEvents: "none" }}>
                      <div style={{ position: "relative", width: "100%", height: "100%" }}>{renderPins(true)}</div>
                    </div>
                    {/* MICRO PINS */}
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                      <div style={{ position: "relative", width: "100%", height: "100%" }}>{renderPins(false)}</div>
                    </div>
                  </div>

                  {/* Fullscreen button */}
                  <button onClick={() => setIsFullscreen(true)}
                    style={{ position: "absolute", top: "8px", right: "8px", zIndex: 20, background: "rgba(0,0,0,0.50)", color: "white", border: "none", borderRadius: "6px", padding: "6px 10px", fontSize: "11px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", letterSpacing: "0.05em" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                    </svg>
                    FULLSCREEN
                  </button>

                  {/* Zoom hint */}
                  <div style={{ position: "absolute", bottom: "8px", right: "8px", background: "rgba(0,0,0,0.45)", color: "white", fontSize: "10px", padding: "3px 7px", borderRadius: "4px", pointerEvents: "none" }}>
                    {zoom > 1 ? `${Math.round(zoom * 100)}% · Scroll to zoom · Drag to pan` : "Scroll to zoom"}
                  </div>
                </div>

              </div>
              <QuickLinksStrip />
            </div>
          </FloatUpText>

          {/* ══════ MOBILE ══════ */}
          <div className="md:hidden mt-6">
            <div className="relative h-[70vh] w-full overflow-hidden rounded-lg">
              <div ref={attachWheelMobile} onMouseDown={handleMouseDown} onMouseMove={handleMouseMovePan} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
                className="absolute inset-0 overflow-hidden select-none"
                style={{ cursor: isPanning ? "grabbing" : "grab", touchAction: "pan-y" }}>
                <div style={{ position: "absolute", top: 0, left: "50%", height: "70vh", width: "auto", transform: `translateX(calc(-50% + ${pan.x}px)) translateY(${pan.y}px) scale(${zoom})`, transformOrigin: "center top", transition: mapTransition }}>
                  <img ref={mapImgRef} src="/map2.svg" alt="Location Map" draggable={false} className="ob block w-auto max-w-none" style={{ height: "calc(70vh * 1.28)", marginTop: "calc(70vh * -0.14)" }} />
                  <div className="absolute left-0 w-full" style={{ top: "calc(70vh * -0.14)", height: "calc(70vh * 1.28)" }}>
                    <div style={{ position: "absolute", top: `${pinTopOffset}%`, left: 0, width: "100%", height: `${100 - pinTopOffset}%`, pointerEvents: "none" }}>
                      <div style={{ position: "relative", width: "100%", height: "100%" }}>{renderPins(true)}</div>
                    </div>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                      <div style={{ position: "relative", width: "100%", height: "100%" }}>{renderPins(false)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute right-2 top-2 z-30 rounded bg-black/45 px-[7px] py-[3px] text-[10px] text-white">
                {zoom > 1 ? `${Math.round(zoom * 100)}% · Drag to pan` : "Pinch to zoom"}
              </div>

              <motion.div key={activePin.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 z-[25] rounded-t-2xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)]">
                <div onClick={() => setIsStripMinimised(m => !m)} className="flex cursor-pointer items-center justify-between px-5 pb-2 pt-3">
                  <div className="h-1 w-9 rounded-[2px] bg-gray-200" />
                  <motion.span animate={{ rotate: isStripMinimised ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-sm leading-none text-gray-400">▼</motion.span>
                </div>
                <motion.div animate={{ height: isStripMinimised ? 0 : "auto", opacity: isStripMinimised ? 0 : 1 }} transition={{ duration: 0.25, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
                  <div style={{ padding: "0 20px 20px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, textTransform: "uppercase", color: "#111", marginBottom: "6px", letterSpacing: "0.05em" }}>{renderTitleWithLineBreaks(activePin.title)}</h3>
                    {activePin.description && <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6", marginBottom: "8px" }}>{activePin.description}</p>}
                    {activePin.eta && <p style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600, marginBottom: "6px" }}>⏱ {activePin.eta}</p>}
                    {activePin.details && activePin.details.length > 0 && (
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
                        {activePin.details.map((d, i) => <span key={i} style={{ background: "#f0fdf4", color: "#166534", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px", border: "1px solid #bbf7d0" }}>{d}</span>)}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <div className="px-1"><QuickLinksStrip /></div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          FULLSCREEN MODAL
          — position:fixed so it truly covers the viewport
          — image fills modal WIDTH, height is auto (natural ratio)
          — top/bottom overflow is clipped by overflow:hidden
          — pin percentages stay correct because they're relative
            to the image element's rendered dimensions
      ══════════════════════════════════════════════════════ */}
      {isFullscreen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setIsFullscreen(false)}
        >
          {/* Map box — stop clicks bubbling to backdrop */}
          <div
            ref={attachWheelFullscreen}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMovePan}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "calc(100vw - 48px)",
              height: "calc(100vh - 48px)",
              borderRadius: "14px",
              overflow: "hidden",           // clips top/bottom of taller-than-modal image
              background: "#fff",
              cursor: zoom > 1 ? (isPanning ? "grabbing" : "grab") : "default",
              userSelect: "none",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* ZOOM + PAN WRAPPER
                transformOrigin center center — same as desktop.
                Image fills full width, height is auto → natural ratio preserved.
                The parent overflow:hidden clips whatever hangs above/below. */}
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: mapTransition,
                position: "absolute",
                // fill the whole modal so centering math works correctly
                top: 0, left: 0, right: 0, bottom: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Wrapper that is exactly as wide as the modal and as tall as the natural image ratio */}
              <div style={{ position: "relative", width: "100%", flexShrink: 0 }}>
                {/* Image fills width, height follows natural ratio */}
                <img
                  src="/map1.svg"
                  alt="Location Map"
                  draggable={false}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                {/* LEGACY PINS — same offsets as always */}
                <div style={{ position: "absolute", top: `${pinTopOffset}%`, left: -4, width: "100%", height: `${100 - pinTopOffset}%`, pointerEvents: "none" }}>
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>{renderPins(true)}</div>
                </div>
                {/* MICRO PINS */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>{renderPins(false)}</div>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              style={{ position: "absolute", top: "14px", right: "14px", zIndex: 20, background: "rgba(0,0,0,0.55)", color: "white", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "7px", letterSpacing: "0.05em" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              CLOSE
            </button>

            {/* Zoom hint */}
            <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(0,0,0,0.45)", color: "white", fontSize: "11px", padding: "4px 8px", borderRadius: "4px", pointerEvents: "none" }}>
              {zoom > 1 ? `${Math.round(zoom * 100)}% · Scroll to zoom · Drag to pan` : "Scroll to zoom"}
            </div>

            {/* Active pin info card — bottom left */}
            {activePin && activePin.type !== "site" && (
              <div style={{ position: "absolute", bottom: "14px", left: "14px", zIndex: 20, background: "rgba(255,255,255,0.96)", borderRadius: "12px", padding: "14px 16px", maxWidth: "280px", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}>
                {activePin.image && (
                  <img src={activePin.image} alt={activePin.title} style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }} />
                )}
                <h3 style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", color: "#111", marginBottom: "3px", letterSpacing: "0.06em" }}>
                  {renderTitleWithLineBreaks(activePin.title)}
                </h3>
                {activePin.eta && <p style={{ fontSize: "11px", color: "#16a34a", fontWeight: 600 }}>{activePin.eta}</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✅ BLUE CTA SECTION */}
      <div className="w-full bg-[#2F7F90] py-14">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
          <div className="text-center md:text-left max-w-3xl">
            <FloatUpText>
              <h2 className="section-heading text-white mb-4">Are you excited about the project?</h2>
            </FloatUpText>
            <FloatUpText>
              <p className="text-white atext-base leading-relaxed max-w-xl">
                Don't miss the opportunity to own the property in fast growing satellite township of Devanahalli.
              </p>
            </FloatUpText>
          </div>
          <FloatUpText>
            <CustomButton onClick={() => openModal({ initialValues: { message: "Request Site Visit" } })}>
              REQUEST SITE VISIT
            </CustomButton>
          </FloatUpText>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;