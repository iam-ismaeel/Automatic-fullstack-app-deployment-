import { Button, Input, Textarea } from "rizzui";

const Support = () => {
  return (
    <div className="lg:max-w-full max-w-[38em]">
      <form
        // className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Full Name"
            className="w-full"
            placeholder="Enter full name"
            required
            size="lg"
          />
          <Textarea
            size="lg"
            label="Message"
            placeholder="Type message..."
            required
          />
          <Button size="lg" className="bg-main text-white" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Support;
