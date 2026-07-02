
import Link from 'next/link'

export default function FooterSection() {
  return (
    <div className="w-full">
      {/* TOP: Olive/Sage Green Level - #dee2b1 */}
      <div className="bg-[#dee2b1] py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-10">
            <h2 className="text-[#01381e] text-3xl font-bold mb-3">
              Technical Excellence for Zambia.
            </h2>
            <p className="text-[#01381e]/70 text-base leading-relaxed">
              ZedTech Solutions is a Zambian-based technology company delivering enterprise software, 
              cloud infrastructure, and AI solutions.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM: Dark Forest Green Level - #01381e */}
      <div className="bg-[#01381e] text-[#dee2b1] py-12 px-8">
        <div className="max-w-6xl mx-auto grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[#dee2b1] font-bold text-lg mb-4">
              ZedTech Solutions Ltd.
            </h3>
            <p className="text-sm text-[#dee2b1]/80">© {new Date().getFullYear()} All rights reserved</p>
          </div>
          
          <div>
            <h4 className="text-[#dee2b1] font-bold mb-4">Legal</h4>
            <p className="text-sm text-[#dee2b1]/80">
              ZedTech™ and ZedCloud™ are trademarks
            </p>
            <p className="text-sm mt-2 text-[#dee2b1]/80">
              Partners: <span className="text-[#dee2b1] font-medium">Meta, AWS</span>
            </p>
          </div>

          <div>
            <h4 className="text-[#dee2b1] font-bold mb-4">Contact</h4>
            <p className="text-sm text-[#dee2b1]/80">support@zedtech.co.zm</p>
            <p className="text-sm text-[#dee2b1]/80">+260 211 400 000</p>
            <p className="text-sm text-[#dee2b1]/80">Lusaka, Zambia</p>
          </div>

          <div>
            <h4 className="text-[#dee2b1] font-bold mb-4">Social</h4>
            <div className="flex gap-4">
              <Link href="https://twitter.com/zedtechzm" className="hover:text-white text-sm text-[#dee2b1]/80 transition-colors">Twitter</Link>
              <Link href="https://facebook.com/zedtechzm" className="hover:text-white text-sm text-[#dee2b1]/80 transition-colors">Facebook</Link>
              <Link href="https://linkedin.com/company/zedtechzm" className="hover:text-white text-sm text-[#dee2b1]/80 transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}