import classNames from "classnames";

type AvatarProps = {
    imageSrc?: string;
    altText?: string;
    className?: string;
    width?: string;
    height?: string;
};
export default function Avatar({ imageSrc, altText, className, width, height }: AvatarProps) {
    return (
        <div style={{ width: width, height: height }} className={classNames(` rounded-full overflow-hidden border-3 border-white shadow-lg`, className)}>
            <img
                src={imageSrc} // Replace with your avatar image path
                alt={altText || "Avatar"}
                className="w-full h-full object-cover"
            />
        </div>
    );
}