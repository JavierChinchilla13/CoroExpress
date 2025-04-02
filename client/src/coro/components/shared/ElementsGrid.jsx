import { useState } from "react";
import ItemCard from "./ItemCard";
import { ItemDetailsCard } from "./ItemDetailsCard";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";
import PropTypes from "prop-types";
import axios from "axios";
import { updatePost, uploadImage } from "../../utils/profileService";

export const ElementsGrid = ({
  data,
  searchTerm,
  onCloseDeleteModal,
  onCloseEditModal,
}) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [, setShowContactForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState(null);

  // Filtrar perfiles por nombre
  const filteredProfiles = searchTerm
    ? data?.filter((element) =>
        element.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const handleViewDetails = (element) => {
    setSelectedProfile(element);
    setShowContactForm(false);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
  };

  const handleSetEditProfile = (profile) => {
    setProfileToEdit(profile);
    setShowEditModal(true);
  };

  const handleSetDeleteProfile = (profile) => {
    setProfileToDelete(profile);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    const profileId = profileToDelete?._id;

    axios.delete(`/api/v1/profile/${profileId}`).catch(() => {
      console.log("error");
    });

    onCloseDeleteModal();
    setShowDeleteModal(false);
  };

  const handleEdit = async (updatedProfile) => {
    let imageUrl = "";
    if (updatedProfile.imageLoaded) {
      const formData = new FormData();
      formData.append("image", updatedProfile.image);
      const { data } = await uploadImage(formData);
      imageUrl = data.image.src;
    }

    const newProfileData = {
      name: updatedProfile.name,
      lastname: updatedProfile.lastname,
      description: updatedProfile.description,
      state: updatedProfile.state,
      image: updatedProfile.imageLoaded ? imageUrl : updatedProfile.image,
    };

    await updatePost(updatedProfile._id, newProfileData);
    onCloseEditModal();
    setShowEditModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
        {filteredProfiles?.map((element) => (
          <ItemCard
            key={element._id}
            name={element.name}
            lastname={element.lastname}
            description={element.description}
            image={element.image}
            type={element.type}
            state={element.state}
            onViewDetails={() => handleViewDetails(element)}
            onEdit={() => handleSetEditProfile(element)}
            onDelete={() => handleSetDeleteProfile(element)}
          />
        ))}
      </div>

      {selectedProfile && (
        <ItemDetailsCard data={selectedProfile} onClose={handleCloseModal} />
      )}

      {showDeleteModal && (
        <DeleteModal
          profile={profileToDelete}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showEditModal && (
        <EditModal
          profile={profileToEdit}
          onClose={() => setShowEditModal(false)}
          onSave={handleEdit}
        />
      )}
    </>
  );
};

ElementsGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  searchTerm: PropTypes.string,
  onCloseDeleteModal: PropTypes.func,
  onCloseEditModal: PropTypes.func,
};
