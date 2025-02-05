import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenBox } from "lucide-react";
import { Button } from "../components/button";
import { EmailInput, NameInput } from "../components/input";
import Navbar from "../components/navbar";
import { FieldValues, useForm } from "react-hook-form";
import useAxiosPrivateInstance from "../hooks/useAxiosPrivateInstance";
import ContentGuard from "../hooks/contentGuard";

type EditClickEvent = React.MouseEvent<HTMLButtonElement>;

interface Profile {
  email: string;
  first_name: string;
  last_name: string;
  image?: string;
}

function AccountPage() {
  const axiosPrivateInstance = useAxiosPrivateInstance();
  const [profile, setProfile] = useState<Profile>({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [loadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const { register: registerImage } = useForm();

  // Fetch data profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosPrivateInstance.get("/profile");
        setProfile(response.data.data);
        setImage(response.data.data.profile_image);
        reset({
          email: response.data.data.email,
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [axiosPrivateInstance, reset]);

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
    try {
      const response = await axiosPrivateInstance.put("/profile/update", {
        first_name: data.first_name,
        last_name: data.last_name,
      });

      if (response.status === 200) {
        setIsEditing(false);
        console.log(response.data.data);
      }
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
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
                <img
                  src={image}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
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
                  placeholder={loadingProfile ? "Loading..." : "email anda"}
                  disabled={!isEditing}
                  defaultValue={profile.email}
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
                  placeholder={loadingProfile ? "Loading..." : "nama depan"}
                  disabled={!isEditing}
                  defaultValue={profile.first_name}
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
                  placeholder={loadingProfile ? "Loading..." : "nama belakang"}
                  disabled={!isEditing}
                  defaultValue={profile.last_name}
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
                    {isSubmitting ? "Menyimpan..." : "Simpan"}
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
