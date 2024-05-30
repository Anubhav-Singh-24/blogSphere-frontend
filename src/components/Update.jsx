import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { IoMdCloudUpload } from "react-icons/io";
import { API } from "../service/api.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import blogImg from "../assets/blog.jpg";

const Update = () => {
  const [post, setPost] = useState({});
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(false);
  const [editorData, setEditorData] = useState("");
  const quillRef = useRef(null)

  const { id } = useParams();

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  let navigate = useNavigate();

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await API.getPostById(id);
        if (response.isSuccess) {
          setPost(response.data);
        }
      } catch (error) {
        error.then((innerError) => {
          toast.error(innerError.msg, {
            autoClose: 2000,
            position: "top-center",
          });
        });
      }
    };
    if (id) {
      fetchPostById();
    }
  }, [id]);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill("#editor", {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
      });

      quillRef.current.on("text-change", () => {
        setEditorData(quillRef.current.root.innerHTML);
      });
    }
    if (post.content) {
      quillRef.current.root.innerHTML = post.content;
    }
    // eslint-disable-next-line
  }, [post.content]);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        try {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
          const res = await API.uploadFile(data);
          post.picture = res.data;
          setImage(post.picture);
          toast.success("Image Uploaded Successfully", {
            autoClose: 2000,
            position: "top-center",
          });
        } catch (error) {
          error.then((innerError) => {
            toast.error(innerError.msg, {
              autoClose: 2000,
              position: "top-center",
            });
          });
        }
      }
    };
    getImage();
    // eslint-disable-next-line
  }, [file]);

  const handleFormDataChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const cancelPost = async () => {
    if (image) {
      await API.deleteFile(image.split("/")[4]);
    }
    navigate(`/detail/${id}`);
  };

  const updatePostById = async () => {
    try {
      post.content = editorData;
      let response = await API.updatePost(post);
      if (response.isSuccess) {
        toast.success(response.data.msg, {
          autoClose: 2000,
          position: "top-center",
        });
      }
      navigate(`/detail/${id}`);
    } catch (error) {
      error.then((innerError) => {
        toast.error(innerError.msg, {
          autoClose: 2000,
          position: "top-center",
        });
      });
    }
  };

  return (
    <div className="mt-32 px-7 pb-10 w-full flex flex-col gap-10 dark:bg-[rgba(8,10,21,1)] dark:text-white">
      <h1 className="text-center text-[#7c4ee4] text-3xl font-bold w-full">
        Share Your Thoughts!!
      </h1>
      <div
        className={`flex ${
          preview ? "md:flex-row flex-col" : "flex-col"
        } w-full gap-5`}
      >
        <div className="w-full flex flex-col gap-10">
          <form className="flex flex-col gap-10 w-full text-black">
            <div className="flex flex-col gap-3 w-full">
              <span className="text-2xl font-bold text-[#7c4ee4]">Title</span>
              <input
                type="text"
                name="title"
                className="focus:outline-none border-y-2 border-[#7c4ee4] p-3 rounded-lg"
                placeholder="Blog Title"
                onChange={handleFormDataChange}
                required={true}
                value={post.title || ""}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <span className="text-2xl font-bold text-[#7c4ee4]">
                Category
              </span>
              <input
                type="text"
                name="category"
                className="focus:outline-none border-y-2 border-[#7c4ee4] p-3 rounded-lg"
                placeholder="Blog Category"
                required={true}
                onChange={handleFormDataChange}
                value={post.category || ""}
              />
            </div>
          </form>
          <div className="flex flex-col gap-3 w-full">
            <span className="text-2xl font-bold text-[#7c4ee4]">Content</span>
            <div className="" id="editor"></div>
          </div>
          <div className="w-full flex justify-center">
            <label
              htmlFor="picture"
              className="flex text-white gap-3 bg-[#7c4ee4] md:w-[50%] w-full rounded-xl hover:bg-white border-2 border-solid border-[#7c4ee4] hover:text-[#7c4ee4] justify-center px-4 py-2 items-center duration-500 ease-in-out cursor-pointer"
            >
              <span className="text-lg font-bold">Upload</span>
              <IoMdCloudUpload size={20} />
              <input
                type="file"
                name="picture"
                id="picture"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>
        <div
          className={`${
            preview ? "w-full" : "hidden"
          } flex flex-col gap-5 px-3`}
        >
          <h1 className="text-3xl text-center font-bold text-[#7c4ee4]">
            Preview
          </h1>
          <span className="text-2xl font-bold">{post.title}</span>
          <span className="text-sm font-bold text-gray-500 px-3 dark:text-white">
            {post.category}
          </span>
          <div className="w-full flex justify-center">
            <img
              src={post.picture || blogImg}
              alt="post"
              className="w-full h-auto p-2 rounded-3xl object-fit"
            />
          </div>
          <div
            className="px-3 text-gray-500 ql-editor dark:text-white"
            dangerouslySetInnerHTML={{ __html: editorData }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex gap-10 w-full items-center justify-center">
          <button
            onClick={cancelPost}
            className="text-white bg-[#7c4ee4] px-4 py-2 border-[#7c4ee4] border-2 border-solid rounded-lg text-md font-bold hover:bg-white hover:text-red-400 duration-500 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={updatePostById}
            className="text-white bg-[#7c4ee4] px-4 py-2 border-[#7c4ee4] border-2 border-solid text-md font-bold rounded-lg hover:bg-white hover:text-[#7c4ee4] duration-300 ease-in-out"
          >
            Update
          </button>
        </div>
        <div className="flex w-full justify-center items-center">
          <button
            onClick={() => setPreview(!preview)}
            className="md:w-[20%] w-full rounded-lg text-lg font-bold px-6 py-2 text-white bg-[#7c44e4] hover:bg-white hover:text-[#7c4ee4] border-2 border-solid border-[#7c4ee4] duration-500 ease-in-out"
          >
            {preview ? "Hide" : "Preview"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
