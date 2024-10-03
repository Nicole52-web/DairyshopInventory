import React from 'react'
import Foot from '../images/on.png'

const Footer = () => {
  return (
    <footer class="w-full p-8 bg-white">
    <div
      class="flex flex-row flex-wrap items-center justify-center text-center bg-white gap-y-6 gap-x-12 md:justify-between">
      <img src={Foot} alt="logo-ct" class="w-10" />
      <ul class="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <a href="/"
            class="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
            About Us
          </a>
        </li>
        <li>
          <a href="/"
            class="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
            License
          </a>
        </li>
        <li>
          <a href="/"
            class="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
            Contribute
          </a>
        </li>
        <li>
          <a href="/"
            class="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
            Contact Us
          </a>
        </li>
      </ul>
    </div>
    <span class="block my-8 border-t border-blue-gray-50" />
    <p class="block font-sans text-base antialiased font-normal leading-relaxed text-center text-blue-gray-900">
      © 2024 Onyx Dairies
    </p>
  </footer>
  )
}

export default Footer
