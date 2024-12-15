import FeatureCard from "@/components/FeatureCard"

export default function Feature() {
    return (
        <section id="features" className=" py-20 md:py-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <FeatureCard
              title="Real-time Translation"
              description="Instantly translate between sign language and text or speech."
              icon="🚀"
            />

            <FeatureCard
              title="Multiple Sign Languages"
              description="Support for various sign languages from around the world."
              icon="🌍"
            />

            <FeatureCard
              title="AI-Powered Accuracy"
              description="Utilizes advanced AI models for high-precision translations."
              icon="🧠"
            />

            <FeatureCard
              title="User-Friendly Interface"
              description="Designed with simplicity and accessibility in mind for all age groups."
              icon="✨"
            />
          </div>
        </div>
      </section>
    )
}