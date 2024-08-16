import { Link, useNavigate, useParams } from "react-router-dom";
import EventForm from "./EventForm";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import API_URL from "./global";

export default function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get(`${API_URL}/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
        //navigate("/"); // Redirect to the home page if the event is not found
      }
    }

    fetchEvent();
  }, [id, navigate]);

  function backbutton() {
    navigate(-1); // Navigate back to the previous page
  }

  function Bookslotfunction() {
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    if (isVisible && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isVisible]);

  if (!event) {
    return <div>Loading...</div>; // Show a loading message while the event data is being fetched
  }

  return (
    <div>
      <div className="inneorn-contaidowr">
        <div
          className="backbuttonicon"
          onClick={backbutton}
          style={{ cursor: "pointer" }}
        >
          <a>
            <img
              className="image-backing"
              src="/images/back-icon.png"
              alt="arrow back icon"
            />
          </a>
          <p className="eiodnf">Back</p>
        </div>
        <div className="imagebaonnersection">
          <img
            className="image-withith"
            src={event.thumbnail}
            alt={event.eventTitle}
          />
        </div>
        <div className="para-headingins">
          <h1 className="heaindingisns">{event.eventTitle}</h1>
          <div
            className="aondpapara"
            dangerouslySetInnerHTML={{
              __html: event.eventContent,
            }}
          />
        </div>

        <div className="aondofj">
          <div className="rithishtsitde">
            <div className="iconandword">
              <img
                className="icon-sizeindos"
                src="/images/bag-icon.png"
                alt="bag icon"
              />
              <p className="iconfidxiend">
                {new Date(event.eventStartDate).toLocaleDateString()} to{" "}
                {new Date(event.eventEndDate).toLocaleDateString()}
              </p>
            </div>
            <div className="iconandword">
              <img
                className="icon-sizeindos"
                src="/images/ri_time-fill.png"
                alt="time icon"
              />
              <p className="iconfidxiend">{event.eventStartTime}</p>
            </div>
            <div className="iconandword">
              <img
                className="icon-sizeindos"
                src="/images/fluent_location-28-filled.png"
                alt="location icon"
              />
              <p className="iconfidxiend">{event.eventLocation}</p>
            </div>
          </div>
          <div className="rithishtsitde">
            <div className="iconandword">
              <p className="iconfidxiend">
                Entry Fee : ₹ {event.eventEntryFees}/Person
              </p>
            </div>
            <div className="iconandword">
              <button className="ook-solod" onClick={Bookslotfunction}>
                Book Slot
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={sectionRef}>
        {isVisible && (
          <div>
            {/* Pass event.redirectUrl as url prop */}
            <EventForm url={event.redirectUrl} eventId={id} />
          </div>
        )}
      </div>
    </div>
  );
}
