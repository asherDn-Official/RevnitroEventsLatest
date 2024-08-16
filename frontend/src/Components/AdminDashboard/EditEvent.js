import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import API_URL from "../global";
export default function EditEvent() {
  const { eventId } = useParams();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showBookingWindow, setShowBookingWindow] = useState(false);
  const [showEventEndTime, setShowEventEndTime] = useState(false);

  const [newEvent, setNewEvent] = useState({
    eventTitle: "",
    eventStartDate: "",
    eventEndDate: "",
    bookingStartDate: "",
    bookingEndDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventLocation: "",
    eventEntryFees: "",
    RedirectUrl: "",
    thumbnail: "",
    eventContent: "",
  });
  useEffect(() => {
    async function fetchEventDetails() {
      try {
        const response = await axios.get(`${API_URL}/events/${eventId}`, {
          crossDomain: true,
          withCredentials: true,
        });

        //const threadData = response.data;

        setNewEvent(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEventDetails();
  }, [eventId]);
  const updateEvent = async (e) => {
    e.preventDefault();
    const sendData = { ...newEvent };
    try {
      await axios.put(`${API_URL}/events/${eventId}`, sendData, {
        crossDomain: true,
        withCredentials: true,
      });
      showNotification("Event added successfully!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showNotification("Event with the same title already exists.");
      } else {
        showNotification("Error");
      }
    }
  };
  const deleteEvent = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`${API_URL}/events/${eventId}`, {
        crossDomain: true,
        withCredentials: true,
      });
      showNotification("Event added successfully!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showNotification("Event with the same title already exists.");
      } else {
        showNotification("Error");
      }
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    await handleUpload(file);
  };

  const handleThumbnail = async (event) => {
    const file = event.target.files[0];
    await handleUpload(file, true);
  };

  const handleUpload = async (file, isThumbnail = false) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("sampleFile", file);

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // const percentCompleted = Math.round(
          //   (progressEvent.loaded * 100) / progressEvent.total
          // );
          // You can use 'percentCompleted' to update a loading indicator
        },
      });

      setLoading(false);

      if (isThumbnail) {
        setNewEvent({ ...newEvent, thumbnail: response.data.link });
      } else {
        if (editorRef.current) {
          const editor = editorRef.current;
          editor.execCommand(
            "mceInsertContent",
            false,
            `<img className="ImportIamgeWItdh" src="${response.data.link}" alt="Uploaded Image" />`
          );
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
    }
  };

  const showNotification = (message) => {
    alert(message); // Replace with your notification logic
  };

  return (
    <div className="cretyeteh3h434">
      <div className="cg2g3g23g23g33">
        <div>
          <h2 className="createpostheadingdiv">Edit Event</h2>
          <div className="FlexMiddleofthedivmain">
            <div className="createpostdivwidthj">
              <div className="postionofimage">
                <form>
                  <div className="cheadingtopics">
                    <div className="headingcreatepost">Event Title</div>
                    <div className="cinputforumcreatepost">
                      <input
                        type="text"
                        placeholder="Event Title"
                        value={newEvent.eventTitle}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            eventTitle: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="cheadingtopics">
                    <div className="headingcreatepost">Event Start Date</div>
                    <div className="cinputforumcreatepost">
                      <input
                        style={{ paddingRight: "10px", paddingLeft: "10px" }}
                        type="date"
                        placeholder="Event Start Date"
                        value={newEvent.eventStartDate}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            eventStartDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="cheadingtopics">
                    <div className="headingcreatepost">Event End Date</div>
                    <div className="cinputforumcreatepost">
                      <input
                        style={{ paddingRight: "10px", paddingLeft: "10px" }}
                        type="date"
                        placeholder="Event End Date"
                        value={newEvent.eventEndDate}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            eventEndDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="cheadingtopics">
                    <div className="headingcreatepost">
                      <label>
                        <input
                          type="checkbox"
                          checked={showBookingWindow}
                          onChange={(e) =>
                            setShowBookingWindow(e.target.checked)
                          }
                        />
                        Is there a specific booking window?
                      </label>
                    </div>
                  </div>
                  {showBookingWindow && (
                    <>
                      <div className="cheadingtopics">
                        <div className="headingcreatepost">
                          Booking Start Date
                        </div>
                        <div className="cinputforumcreatepost">
                          <input
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            type="date"
                            placeholder="Booking Start Date"
                            value={newEvent.bookingStartDate}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                bookingStartDate: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="cheadingtopics">
                        <div className="headingcreatepost">
                          Booking End Date
                        </div>
                        <div className="cinputforumcreatepost">
                          <input
                            style={{
                              paddingRight: "10px",
                              paddingLeft: "10px",
                            }}
                            type="date"
                            placeholder="Booking End Date"
                            value={newEvent.bookingEndDate}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                bookingEndDate: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="cheadingtopics">
                    <div className="headingcreatepost">Event Start Time</div>
                    <div className="cinputforumcreatepost">
                      <input
                        style={{ paddingRight: "10px", paddingLeft: "10px" }}
                        type="time"
                        placeholder="Event Start Time"
                        value={newEvent.eventStartTime}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            eventStartTime: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="cheadingtopics">
                    <label>
                      <input
                        type="checkbox"
                        checked={showEventEndTime}
                        onChange={(e) => setShowEventEndTime(e.target.checked)}
                      />
                      Is there a specific event end time?
                    </label>
                  </div>
                  {showEventEndTime && (
                    <div className="cheadingtopics">
                      <div className="headingcreatepost">Event End Time</div>
                      <div className="cinputforumcreatepost">
                        <input
                          style={{ paddingRight: "10px", paddingLeft: "10px" }}
                          type="time"
                          placeholder="Event End Time"
                          value={newEvent.eventEndTime}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              eventEndTime: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div className="cheadingtopics">
                    <div className="headingcreatepost">Location</div>
                    <div className="cinputforumcreatepost">
                      <input
                        style={{ paddingRight: "10px", paddingLeft: "10px" }}
                        type="text"
                        placeholder="Location"
                        value={newEvent.eventLocation}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            eventLocation: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="cheadingtopics">
                    <div className="headingcreatepost">Entry Fees</div>
                    <div className="cinputforumcreatepost">
                      <input
                        style={{ paddingRight: "10px", paddingLeft: "10px" }}
                        type="number"
                        placeholder="Entry Fees"
                        value={newEvent.eventEntryFees}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            eventEntryFees: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="cheadingtopics">
                    <div className="headingcreatepost">Form Link</div>
                    <div className="cinputforumcreatepost">
                      <input
                        style={{ paddingRight: "10px", paddingLeft: "10px" }}
                        type="text"
                        placeholder="Form Link"
                        value={newEvent.RedirectUrl}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            RedirectUrl: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="thumbnailsecrionforcreatepost">
                    <div className="thumbnailtextscreatepost">Thumbnail</div>
                    <div className="imagethumbnailpreviewdivtag">
                      <div>
                        <div className="file-input">
                          <input
                            type="file"
                            name="sampleFile"
                            id="file-input"
                            className="file-input__input"
                            onChange={handleThumbnail}
                            disabled={loading} // Disable input while loading
                          />
                          <label
                            className="file-input__label"
                            htmlFor="file-input"
                          >
                            <img src="./images/tabler_photo.png" alt="" />
                            <span className="uploadimagecreatepost">
                              {loading ? (
                                <span style={{ marginRight: "5px" }}>
                                  Uploading...
                                </span>
                              ) : (
                                <span>
                                  {newEvent.thumbnail ? (
                                    <>Change Thumbnail</>
                                  ) : (
                                    <>Select Thumbnail</>
                                  )}
                                </span>
                              )}
                              {loading && (
                                <div
                                  className="loading-spinner"
                                  style={{
                                    border: "2px solid #f3f3f3",
                                    borderTop: "2px solid #3498db",
                                    borderRadius: "50%",
                                    width: "10px",
                                    height: "10px",
                                    animation: "spin 1s linear infinite",
                                    display: "inline-block",
                                    marginLeft: "10px", // Adjust as needed
                                  }}
                                ></div>
                              )}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="previewwimagesizee">
                        <img
                          src={newEvent.thumbnail}
                          alt="Thumbnail Preview"
                          style={{
                            width: "200px",
                            height: "77.78px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="thumbnailsecrionforcreatepost11">
                    <div className="thumbnailtextscreatepost">Post</div>
                    <div className="imagethumbnailpreviewdivtag">
                      <div>
                        <div className="file-input">
                          <input
                            type="file"
                            name="sampleFile"
                            className="file-input__input"
                            onChange={handleFileChange}
                            disabled={loading} // Disable input while loading
                            id="file-insert"
                          />
                          <label
                            className="file-input__label"
                            htmlFor="file-insert"
                          >
                            <img src="./images/tabler_photo.png" alt="" />
                            <span className="uploadimagecreatepost">
                              {loading ? (
                                <span style={{ marginRight: "5px" }}>
                                  Uploading...
                                </span>
                              ) : (
                                <span>Insert Image</span>
                              )}
                              {loading && (
                                <div
                                  className="loading-spinner"
                                  style={{
                                    border: "2px solid #f3f3f3",
                                    borderTop: "2px solid #3498db",
                                    borderRadius: "50%",
                                    width: "10px",
                                    height: "10px",
                                    animation: "spin 1s linear infinite",
                                    display: "inline-block",
                                    marginLeft: "10px", // Adjust as needed
                                  }}
                                ></div>
                              )}
                            </span>
                          </label>
                        </div>

                        <div className="recommenededsizees"></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Editor
                      apiKey="2edzfx0mgryctyfre9pj8d0fikd96259j7w4wvz15jcfma3g"
                      init={{
                        plugins:
                          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                        toolbar1:
                          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough  | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                        toolbar2:
                          "link image media table mergetags | align lineheight",
                        tinycomments_mode: "embedded",
                        tinycomments_author: "Author name",
                        mergetags_list: [
                          {
                            value: "First.Name",
                            title: "First Name",
                          },
                          { value: "Email", title: "Email" },
                        ],
                        setup: (editor) => {
                          editorRef.current = editor;
                        },
                      }}
                      placeholder="Start Typing"
                      onEditorChange={(eventContent) => {
                        setNewEvent({ ...newEvent, eventContent });
                      }}
                      style={{ width: "0%", height: "1000px", zIndex: "0" }}
                    />
                  </div>
                  <div className="buttonsubmit">
                    <button onClick={updateEvent}>Edit</button>
                    <button
                      onClick={deleteEvent}
                      style={{ background: "red", marginLeft: "20px" }}
                    >
                      Delete Event
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
