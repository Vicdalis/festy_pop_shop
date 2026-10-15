export default function WavesSeparator({ color }: { color: string }) {
    return (
        <div
            className="h-[100px] w-full"
            style={{
                background: `-webkit-gradient(radial, 50% 0, 10, 50% 0, 40, from(${color}), color-stop(0.49, ${color}), color-stop(0.51, #fff), to(white))`,
                backgroundSize: "49px 100%",
            }}
        >
        </div>
    )
}