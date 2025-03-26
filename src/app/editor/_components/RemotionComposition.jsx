import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";

function RemotionComposition({ frameList }) {
  let trackFrame = 0;
  const {width, height} = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {frameList.map((frame, index) => {
        const fromFrame = index === 0 ? 0 : trackFrame;

        trackFrame = trackFrame + frame.duration * 30;
        const duration = frame.duration * 30;

        return (
          <Sequence key={index} from={fromFrame} durationInFrames={duration}>
            <h2
              style={{
                color: "#ffffff",
              }}
            >
              <AbsoluteFill style={{
                transform: `translateX(${width/ 2}px) translateY(${height/ 2}px)`,
              }}>
                <h2>{frame.text}</h2>
              </AbsoluteFill>
            </h2>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
export default RemotionComposition;
