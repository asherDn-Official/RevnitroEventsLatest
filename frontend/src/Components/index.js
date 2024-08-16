import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "./global";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [events, setEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [visibleContent, setVisibleContent] = useState("upcoming");

  useEffect(() => {
    async function fetchAllEvents() {
      try {
        const response = await axios.get(`${API_URL}/events`, {
          crossDomain: true,
          withCredentials: true,
        });
        setEvents(response.data);
        segregateEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAllEvents();
  }, []);

  const segregateEvents = (events) => {
    const currentDate = new Date();
    const upcoming = events.filter(
      (event) => new Date(event.eventStartDate) >= currentDate
    );
    const past = events.filter(
      (event) => new Date(event.eventStartDate) < currentDate
    );

    setCurrentEvents(upcoming);
    setPastEvents(past);
  };

  const buttonStyles = (isActive) => ({
    cursor: "pointer",
    backgroundColor: isActive ? "#232b70" : "#f1f1f1",
    color: isActive ? "white" : "black",
  });

  const showUpcomingEvents = () => setVisibleContent("upcoming");
  const showPastEvents = () => setVisibleContent("past");

  return (
    <div>
      <div className="container">
        <img
          src="./images/banner.png"
          alt="Full-width image"
          className="image"
        />
        <div className="overlay">
          <div className="text">
            <h2 className="image-text-center">Revnitro Events</h2>
          </div>
        </div>
      </div>
      <div className="button-center-div">
        <div className="button-fl">
          <button
            className="upcomingbutton"
            style={buttonStyles(visibleContent === "upcoming")}
            onClick={showUpcomingEvents}
          >
            Upcoming Events
          </button>
          <button
            className="upcomingbutton"
            style={buttonStyles(visibleContent === "past")}
            onClick={showPastEvents}
          >
            Past Events
          </button>
        </div>
      </div>

      {visibleContent === "upcoming" && (
        <div className="content active">
          <div
            className="allidv"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <section className="blog-posts">
              {currentEvents.map((event) => (
                <div key={event._id} className="heading-section">
                  <a>
                    <article className="cardzz">
                      <div className="card-image">
                        <img
                          className="imageinsofn"
                          src={event.thumbnail}
                          alt="eventimage"
                        />
                      </div>
                      <a style={{ textDecoration: "none", color: "black" }}>
                        <div className="card-content">
                          <div className="dfietbisb">
                            <h3>{event.eventTitle}</h3>
                            <p className="osnofnsl">
                              {new Date(event.eventStartDate).toDateString()}
                            </p>
                          </div>
                          {/* <p className="paraidnfons">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: event.eventContent
                                  .replace(/<img[^>]*>/g, "")
                                  .replace(/<p[^>]*>/g, "")
                                  .slice(0, 390),
                              }}
                            />
                            <Link to={`/EventDetail/${event._id}`}>
                              Read More
                            </Link>
                          </p> */}
                          <p className="paraidnfons">
                            {event.eventContent
                              .replace(/<\/?[^>]+(>|$)/g, "")
                              // .replace(/<p[^>]*>/g, "")
                              .slice(0, 200)}
                            .....
                            <Link to={`/EventDetail/${event._id}`}>
                              Read More
                            </Link>
                          </p>
                          <div className="icon-formeo">
                            <div className="iconpari">
                              <img
                                className="ioocin"
                                src="./images/bag-icon.png"
                                alt="date-icon"
                              />
                              <p className="iconds">
                                {new Date(
                                  event.eventStartDate
                                ).toLocaleDateString()}{" "}
                                to{" "}
                                {new Date(
                                  event.eventEndDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="iconpari">
                              <img
                                className="ioocin"
                                src="./images/fluent_location-28-filled.png"
                                alt="location-icon"
                              />
                              <p className="iconds">{event.eventLocation}</p>
                            </div>
                            <div className="iconpari">
                              <img
                                className="ioocin"
                                src="./images/ri_time-fill.png"
                                alt="time-icon"
                              />
                              <p className="iconds">{event.eventStartTime}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </article>
                  </a>
                </div>
              ))}
            </section>
          </div>
        </div>
      )}

      {visibleContent === "past" && (
        <div className="content active">
          <div
            className="allidv"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <section className="blog-posts">
              {pastEvents.map((event) => (
                <div key={event._id} className="heading-section">
                  <a>
                    <article className="cardzz">
                      <div className="card-image">
                        <img
                          className="imageinsofn"
                          src={event.thumbnail}
                          alt="eventimage"
                        />
                      </div>
                      <a style={{ textDecoration: "none", color: "black" }}>
                        <div className="card-content">
                          <div className="dfietbisb">
                            <h3>{event.eventTitle}</h3>
                            <p className="osnofnsl">
                              {new Date(event.eventStartDate).toDateString()}
                            </p>
                          </div>
                          <p className="paraidnfons">
                            {event.eventContent
                              .replace(/<\/?[^>]+(>|$)/g, "")
                              // .replace(/<p[^>]*>/g, "")
                              .slice(0, 200)}
                            .....
                            <Link to={`/EventDetail/${event._id}`}>
                              Read More
                            </Link>
                          </p>
                          <div className="icon-formeo">
                            <div className="iconpari">
                              <img
                                className="ioocin"
                                src="./images/bag-icon.png"
                                alt="date-icon"
                              />
                              <p className="iconds">
                                {new Date(
                                  event.eventStartDate
                                ).toLocaleDateString()}{" "}
                                to{" "}
                                {new Date(
                                  event.eventEndDate
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="iconpari">
                              <img
                                className="ioocin"
                                src="./images/fluent_location-28-filled.png"
                                alt="location-icon"
                              />
                              <p className="iconds">{event.eventLocation}</p>
                            </div>
                            <div className="iconpari">
                              <img
                                className="ioocin"
                                src="./images/ri_time-fill.png"
                                alt="time-icon"
                              />
                              <p className="iconds">{event.eventStartTime}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </article>
                  </a>
                </div>
              ))}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
