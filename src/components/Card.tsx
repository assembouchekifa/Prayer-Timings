type prop = {
  salat: string;
  time: string;
  border: boolean;
};

function Card({ salat, time, border }: prop) {
  return (
    <div className="w-full px-1">
      <div
        className="w-full px-4 py-1  flex-row flex justify-between border-black"
        style={{ borderBottom: border ? "solid 1px" : "" }}
      >
        <div>{salat}</div>
        <div>{time}</div>
      </div>
    </div>
  );
}

export default Card;
