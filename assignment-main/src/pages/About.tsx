import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Về Nam Motors</h1>
          <p className="text-xl opacity-90">
            Đối tác tin cậy của bạn trong lĩnh vực xe máy chất lượng cao
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Company Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Câu chuyện của chúng tôi
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
              Nam Motors được thành lập vào năm 2020 với sứ mệnh mang đến cho khách hàng những sản phẩm xe máy chất lượng cao với giá cả hợp lý. Chúng tôi tin rằng mọi người đều xứng đáng được sở hữu một chiếc xe máy an toàn, tiết kiệm nhiên liệu và phù hợp với nhu cầu sử dụng.
              </p>
              <p className="mb-6">
              Từ những ngày đầu thành lập, chúng tôi đã tập trung vào việc xây dựng mối quan hệ bền vững với các đối tác sản xuất uy tín, đảm bảo mọi sản phẩm đều đáp ứng các tiêu chuẩn chất lượng quốc tế.
              </p>
              <p>
              Ngày nay, Nam Motors tự hào là một trong những đại lý xe máy hàng đầu, phục vụ hàng nghìn khách hàng mỗi năm với cam kết về chất lượng và dịch vụ.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Sứ mệnh</h3>
            </div>
            <p className="text-gray-600 text-center">
              Cung cấp những sản phẩm xe máy chất lượng cao, an toàn và tiết kiệm, 
              giúp khách hàng có được phương tiện di chuyển phù hợp với mọi nhu cầu.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Tầm nhìn</h3>
            </div>
            <p className="text-gray-600 text-center">
              Trở thành đại lý xe máy hàng đầu, được tin tưởng và lựa chọn bởi 
              khách hàng trên toàn quốc, góp phần phát triển giao thông bền vững.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Giá trị cốt lõi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Chất lượng</h4>
              <p className="text-gray-600">
                Cam kết cung cấp sản phẩm chất lượng cao, đáp ứng mọi tiêu chuẩn an toàn.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Uy tín</h4>
              <p className="text-gray-600">
                Xây dựng niềm tin với khách hàng thông qua dịch vụ chuyên nghiệp và minh bạch.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Đổi mới</h4>
              <p className="text-gray-600">
                Không ngừng cải tiến và áp dụng công nghệ mới để phục vụ khách hàng tốt hơn.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600">Khách hàng hài lòng</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Mẫu xe đa dạng</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">3+</div>
            <div className="text-gray-600">Năm kinh nghiệm</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
            <div className="text-gray-600">Hỗ trợ khách hàng</div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Đội ngũ của chúng tôi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100">
                <img
                  src="/images/cuong.jpg"
                  alt="YoungLTC"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' font-family='Arial' font-size='16' fill='%239ca3af' text-anchor='middle' dy='.3em'%3EYoungLTC%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Nguyen Van A</h4>
              <p className="text-blue-600 font-medium mb-2">Giám đốc điều hành</p>
              <p className="text-gray-600 text-sm">
                Với hơn 10 năm kinh nghiệm trong ngành xe máy, anh A đã xây dựng 
                Nam Motors từ một cửa hàng nhỏ thành đại lý uy tín như ngày nay.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-100">
                <img
                  src="/images/cuong.jpg"
                  alt="YoungLTC"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' font-family='Arial' font-size='16' fill='%239ca3af' text-anchor='middle' dy='.3em'%3EYoungLTC%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Nguyen Van B</h4>
              <p className="text-blue-600 font-medium mb-2">Trưởng phòng kinh doanh</p>
              <p className="text-gray-600 text-sm">
                Anh B chịu trách nhiệm về chiến lược kinh doanh và phát triển 
                mối quan hệ với đối tác, khách hàng.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-yellow-100">
                <img
                  src="/images/nam.jpg"
                  alt="Nguyễn Văn Nam"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' font-family='Arial' font-size='16' fill='%239ca3af' text-anchor='middle' dy='.3em'%3EHùng%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Nguyễn Văn C</h4>
              <p className="text-blue-600 font-medium mb-2">Nhân viên kỹ thuật</p>
              <p className="text-gray-600 text-sm">
                Anh C đảm bảo mọi sản phẩm đều được kiểm tra chất lượng kỹ lưỡng 
                trước khi giao đến tay khách hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 