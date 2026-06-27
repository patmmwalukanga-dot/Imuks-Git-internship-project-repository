
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 py-12 px-8 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-slate-900 dark:text-white font-bold mb-4">
            ZedTech Solutions Ltd.
          </h3>
          <p className="text-sm">© {new Date().getFullYear()} ZedTech Solutions Ltd. All rights reserved</p>
        </div>
        
        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-4">Legal</h4>
          <p className="text-sm">
            ZedTech™ and ZedCloud™ are trademarks of ZedTech Solutions Ltd.
          </p>
          <p className="text-sm mt-2">
            Partners: <span className="text-slate-600 dark:text-slate-300">Meta, AWS</span>
          </p>
        </div>

        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-4">Contact</h4>
          <p className="text-sm">Email: support@zedtech.co.zm</p>
          <p className="text-sm">Phone: +260 211 400 000</p>
          <p className="text-sm">Lusaka, Zambia</p>
        </div>

        <div>
          <h4 className="text-slate-900 dark:text-white font-bold mb-4">Social</h4>
          <div className="flex gap-4">
            <Link href="https://twitter.com/zedtechzm" className="hover:text-blue-500 text-sm">Twitter</Link>
            <Link href="https://facebook.com/zedtechzm" className="hover:text-blue-500 text-sm">Facebook</Link>
            <Link href="https://linkedin.com/company/zedtechzm" className="hover:text-blue-500 text-sm">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}