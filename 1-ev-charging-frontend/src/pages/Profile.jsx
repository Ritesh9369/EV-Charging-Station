import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaSignOutAlt,
  FaEdit,
  FaLock,
  FaCamera
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const userId = 19; // Change as needed

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profile_image: ""
  });

  const [newProfile, setNewProfile] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/profile/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setProfile({
          name: data.full_name,
          email: data.email,
          phone: data.phone || "Not Provided",
          profile_image: data.profile_image
        });
        setNewProfile({
          name: data.full_name,
          email: data.email,
          phone: data.phone || "Not Provided",
          profile_image: data.profile_image
        });
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const validateForm = () => {
    let errors = {};
    if (!newProfile.name.trim()) errors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newProfile.email))
      errors.email = "Invalid email format";
    if (!/^\d{10}$/.test(newProfile.phone))
      errors.phone = "Phone must be 10 digits";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditProfile = () => {
    if (!validateForm()) return;

    fetch(`http://localhost:5000/api/profile/update/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProfile)
    })
      .then((response) => response.json())
      .then(() => {
        setProfile(newProfile);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setNewProfile({ ...newProfile, profile_image: imageUrl });
    }
  };

  const handleUploadImage = () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("profile_image", imageFile);

    fetch(`http://localhost:5000/api/profile/upload/${userId}`, {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile({ ...profile, profile_image: data.profile_image });
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="container profile-container">
      <div className="card profile-card mx-auto shadow-lg p-4">
        <div className="text-center">
          <label htmlFor="upload-profile-pic" className="profile-image-label">
            {profile.profile_image ? (
              <img
                src={`http://localhost:5000${profile.profile_image}`}
                alt="Profile"
                className="profile-image rounded-circle"
              />
            ) : (
              <FaUserCircle size={100} className="text-primary profile-icon" />
            )}
            <FaCamera className="camera-icon" />
          </label>
          <input
            type="file"
            id="upload-profile-pic"
            className="d-none"
            onChange={handleProfileImageChange}
          />

          {/* Added Heading Below Image */}
          <h1 className="mt-3">User Profile</h1>

          {/* Upload Button Below the Heading */}
          <button className="btn btn-primary mt-2" onClick={handleUploadImage}>
            Upload
          </button>
        </div>

        <hr />

        <div className="profile-details">
          <p>
            <FaEdit className="text-dark me-2" />
            {isEditing ? (
              <input
                type="text"
                value={newProfile.name}
                className="form-control"
                onChange={(e) =>
                  setNewProfile({ ...newProfile, name: e.target.value })
                }
              />
            ) : (
              profile.name
            )}
          </p>
          {errors.name && <p className="text-danger">{errors.name}</p>}

          <p>
            <FaEnvelope className="text-success me-2" />
            {isEditing ? (
              <input
                type="text"
                value={newProfile.email}
                className="form-control"
                onChange={(e) =>
                  setNewProfile({ ...newProfile, email: e.target.value })
                }
              />
            ) : (
              profile.email
            )}
          </p>
          {errors.email && <p className="text-danger">{errors.email}</p>}

          <p>
            <FaPhone className="text-info me-2" />
            {isEditing ? (
              <input
                type="text"
                value={newProfile.phone}
                className="form-control"
                maxLength="10" // Restrict to 10 digits
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setNewProfile({ ...newProfile, phone: value });
                }}
              />
            ) : (
              profile.phone
            )}
          </p>
          {errors.phone && <p className="text-danger">{errors.phone}</p>}
        </div>

        <hr />

        <div className="text-center">
          {isEditing ? (
            <button
              className="btn btn-success mt-2"
              onClick={handleEditProfile}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="btn btn-outline-primary me-2"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit className="me-1" /> Edit Profile
            </button>
          )}
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
