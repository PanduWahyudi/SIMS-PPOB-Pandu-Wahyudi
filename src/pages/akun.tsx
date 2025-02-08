import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenBox, Loader2 } from "lucide-react"; 
import { Button } from "../components/button";
import { EmailInput, NameInput } from "../components/input";
import Navbar from "../components/navbar";
import { FieldValues, useForm } from "react-hook-form";
import { axiosPrivateInstance } from "../axios/axios";
import ContentGuard from "../hooks/contentGuard";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type EditClickEvent = React.MouseEvent<HTMLButtonElement>;

function AccountPage() {
  // Profile State
  const { data: profile } = useSelector((state: RootState) => state.profile);

  const [image, setImage] = useState(
    profile?.profile_image || localStorage.getItem("profile_image") || ""
  );

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm();
  const { register: registerImage } = useForm();

  // Upload image
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      console.error(
        "Format file tidak valid. Hanya diperbolehkan JPEG atau PNG."
      );
      return;
    }

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosPrivateInstance.put(
        "/profile/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setImage(response.data.data?.profile_image);
        localStorage.setItem(
          "profile_image",
          response.data.data?.profile_image
        );
        console.log("Image uploaded successfully");
      } else {
        console.error("Gagal mengunggah gambar:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleEditClick = (e: EditClickEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  // Update profile
  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);
    setLoadingProfile(true);
    try {
      const response = await axiosPrivateInstance.put("/profile/update", {
        first_name: data.first_name,
        last_name: data.last_name,
      });

      if (response.status === 200) {
        localStorage.setItem("profile_image", response.data.data.profile_image);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("first_name", response.data.data.first_name);
        localStorage.setItem("last_name", response.data.data.last_name);
        setIsEditing(false);

        console.log(response.data.data);
      }
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoadingProfile(false);
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("profile_image");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
  };

  return (
    <>
      <ContentGuard>
        <Navbar />
        <div className="w-full max-w-6xl mx-auto px-4 flex justify-center items-center min-h-[80vh]">
          <div className="w-full flex flex-col items-center gap-4 px-[20%]">
            {/* Form Upload Image */}
            <div className="w-[120px] h-[120px] flex justify-center items-center relative cursor-pointer">
              <div className="w-[100px] h-[100px] border-2 border-neutral-200 rounded-full overflow-hidden">
                {isUploadingImage ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : (
                  <img
                    src={image}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
              {!isUploadingImage && (
                <>
                  <span>
                    <PenBox className="w-6 h-6 absolute bottom-[10%] right-1" />
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    {...registerImage("profile_image", {
                      onChange: onImageChange,
                    })}
                  />
                </>
              )}
            </div>

            {/* Form Update Profile */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="w-full">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <EmailInput
                  className="mt-1"
                  id="email"
                  placeholder={loadingProfile ? "...." : "email anda"}
                  disabled={!isEditing}
                  defaultValue={
                    profile?.email || localStorage.getItem("email") || ""
                  }
                  {...register("email")}
                />
              </div>
              <div className="w-full mt-4">
                <label htmlFor="first_name" className="text-sm">
                  Nama Depan
                </label>
                <NameInput
                  className="mt-1"
                  id="first_name"
                  placeholder={loadingProfile ? "...." : "nama depan"}
                  disabled={!isEditing}
                  defaultValue={
                    profile?.first_name ||
                    localStorage.getItem("first_name") ||
                    ""
                  }
                  {...register("first_name")}
                />
              </div>
              <div className="w-full mt-4">
                <label htmlFor="last_name" className="text-sm">
                  Nama Belakang
                </label>
                <NameInput
                  className="mt-1"
                  id="last_name"
                  placeholder={loadingProfile ? "...." : "nama belakang"}
                  disabled={!isEditing}
                  defaultValue={
                    profile?.last_name ||
                    localStorage.getItem("last_name") ||
                    ""
                  }
                  {...register("last_name")}
                />
              </div>
              <div className="mt-6">
                {isEditing ? (
                  <Button
                    type="submit"
                    className="w-full disabled:bg-neutral-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : (
                      "Simpan"
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleEditClick}
                    className="w-full bg-white border border-danger text-danger"
                  >
                    Edit Profil
                  </Button>
                )}
              </div>
            </form>

            {!isEditing && (
              <Button onClick={handleLogout} className="w-full">
                Logout
              </Button>
            )}
          </div>
        </div>
      </ContentGuard>
    </>
  );
}

export default AccountPage;
