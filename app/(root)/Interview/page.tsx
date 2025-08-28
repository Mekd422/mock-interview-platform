import Agent from "@/components/Agent";


const Page = async () => {

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName= "Guest"
        type="generate"
      />
    </>
  );
};

export default Page;