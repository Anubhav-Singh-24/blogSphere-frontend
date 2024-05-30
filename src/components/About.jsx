import aboutBanner from '../assets/about_banner.jpg'

const About = () => {
  return (
    <div className="flex flex-col gap-4 items-center xl:mt-28 mt-12 pt-10 w-full dark:bg-[rgba(8,10,21,1)]">
      <div className="flex flex-col gap-2 items-center text-center flex-wrap dark:text-white">
        <span className="text-3xl font-bold">
          Creative Blog Writing and
        </span>
        <span className="text-3xl font-bold text-center">
          publishing site
        </span>
      </div>
      <div className="flex flex-col justify-center text-center md:w-[50%] w-full gap-2 mx-auto px-5 ">
        <span className="text-gray-400 text-md dark:text-white">
          BlogSphere is your go-to platform for engaging and diverse blog
          content. Our platform not only allows you to explore well-crafted
          articles but also provides an opportunity for bloggers to share their
          unique perspectives with a wide audience. Whether you're a writer or a
          reader, explore a wide range of topics and share your unique
          perspectives with a vibrant community.
        </span>
        <span className="text-[#7c4ee4] font-semibold text-lg">
          Join BlogSphere to connect, create, and celebrate the art of blogging.
        </span>
      </div>
      <div className="md:w-[70%] w-full h-auto mx-auto p-2">
        <img
          src={aboutBanner}
          alt="about"
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-col md:items-start items-center md:w-[70%] w-full mx-auto px-3 my-10 dark:text-white">
        <span className="text-3xl font-bold">A little about ourselves</span>
        <div className="mt-6 flex xl:flex-row flex-col xl:items-start items-center mx-auto gap-5">
          <div className="flex flex-col w-[70%] gap-4 p-7 rounded-lg bg-[#7c4ee4] text-white">
            <span className="text-5xl font-bold">01</span>
            <span className="text-xl font-semibold">Values</span>
            <span className="text-md">
              At BlogSphere, we value creativity, authenticity, and community.
              We believe in fostering a supportive environment where diverse
              voices can share their stories and insights. Our commitment to
              quality content and respectful dialogue is at the heart of
              everything we do.
            </span>
            <div className="md:w-[5vw] w-[15vw] h-[1vh] rounded-full bg-white"></div>
          </div>
          <div className="flex flex-col w-[70%] gap-4 p-7 rounded-lg dark:text-white  text-gray-400">
            <span className="text-5xl font-bold">02</span>
            <span className="text-xl font-semibold text-[#7c4ee4]">
              History
            </span>
            <span className="text-md">
              Founded in 2024, BlogSphere began as a small community of
              passionate bloggers looking for a platform to express their ideas
              freely. Over time, it has grown into a vibrant space where writers
              and readers from around the world connect and inspire each other.
            </span>
          </div>
          <div className="flex flex-col w-[70%] gap-4 p-7 rounded-lg dark:text-white text-gray-400">
            <span className="text-5xl font-bold">03</span>
            <span className="text-xl font-semibold text-[#7c4ee4]">Goal</span>
            <span className="text-md">
              Our goal is to become the leading platform for bloggers and
              readers alike, offering a seamless experience that encourages
              creativity and connection. We aim to continuously enhance our
              platform to meet the evolving needs of our community, promoting a
              culture of learning and growth.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
