import { Title, Meta } from 'react-head';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title = "Satria Herman - Portfolio",
    description = "Fullstack Software Engineer specializing in scalable web applications.",
    image = "/vite.svg",
    url = "https://satriaherman.com",
    type = "website"
}: SEOProps) => {
    return (
        <>
            {/* Standard metadata tags */}
            <Title>{title}</Title>
            <Meta name='description' content={description} />

            {/* Facebook tags */}
            <Meta property="og:type" content={type} />
            <Meta property="og:title" content={title} />
            <Meta property="og:description" content={description} />
            <Meta property="og:image" content={image} />
            <Meta property="og:url" content={url} />

            {/* Twitter tags */}
            <Meta name="twitter:creator" content="@satriaherman" />
            <Meta name="twitter:card" content="summary_large_image" />
            <Meta name="twitter:title" content={title} />
            <Meta name="twitter:description" content={description} />
            <Meta name="twitter:image" content={image} />
        </>
    );
}

export default SEO;
