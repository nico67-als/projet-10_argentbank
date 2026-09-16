import Hero from '../components/Hero'
import FeatureItem from '../components/FeatureItem'
import features from '../data/features'
import '../styles/Index.scss'

const Index = () => {
    return (
        <>
            <Hero></Hero>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {features.map((feature) => (
                    <FeatureItem
                        key={feature.id}
                        icon={feature.icon}
                        alt={feature.alt}
                        title={feature.title}
                        text={feature.text}
                    />
                ))}
            </section>
        </>
    )
}

export default Index
