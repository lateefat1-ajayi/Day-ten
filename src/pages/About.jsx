export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-6">
            About Dishcovery
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We're passionate about bringing people together through the joy of cooking and discovering amazing recipes.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At Dishcovery, we believe that cooking should be accessible, enjoyable, and inspiring for everyone. 
                Our platform connects food enthusiasts from around the world, making it easier to discover, 
                share, and create delicious meals.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're a seasoned chef or just starting your culinary journey, Dishcovery provides 
                the tools and community you need to explore new flavors and create memorable dining experiences.
              </p>
            </div>
            <div className="bg-orange-100 rounded-xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🍳</div>
                <h3 className="text-xl font-semibold text-orange-800 mb-2">Cook with Confidence</h3>
                <p className="text-orange-700">Discover recipes that fit your skill level and taste preferences.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">What drives us to create the best cooking experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Global Community</h3>
              <p className="text-gray-600">Connecting food lovers worldwide through shared recipes and culinary traditions.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality First</h3>
              <p className="text-gray-600">Every recipe is carefully curated and tested to ensure the best cooking experience.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Innovation</h3>
              <p className="text-gray-600">Continuously improving our platform with new features and better user experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate people behind Dishcovery</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Chef Sarah</h3>
              <p className="text-orange-600 mb-2">Head of Culinary</p>
              <p className="text-gray-600">Professional chef with 15+ years of experience in fine dining.</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-yellow-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Alex Chen</h3>
              <p className="text-orange-600 mb-2">Lead Developer</p>
              <p className="text-gray-600">Full-stack developer passionate about creating intuitive user experiences.</p>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 bg-red-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Maria Garcia</h3>
              <p className="text-orange-600 mb-2">UX Designer</p>
              <p className="text-gray-600">Designer focused on making cooking accessible and enjoyable for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-yellow-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-xl text-orange-100 mb-8">
            Ready to start your culinary journey? Sign up today and discover amazing recipes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register" 
              className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg text-base font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </a>
            <a 
              href="/login" 
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 rounded-lg text-base font-medium transition-all duration-300"
            >
              Sign In
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
