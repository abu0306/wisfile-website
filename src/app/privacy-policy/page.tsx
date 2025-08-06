import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WisFile: Tidy Your Files with AI",
  description:
    "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
    "Automatically generates clear, consistent filenames based on content. " +
    "Instantly sorts your files into logical folders for easy access. " +
    "All operations run on your device — no cloud, no data leaks.",
  alternates: {
    canonical: "https://www.wisfile.ai/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | WisFile: Tidy Your Files with AI",
    description:
      "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
    url: "https://www.wisfile.ai/privacy-policy",
    siteName: "WisFile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Wisfileofficial",
    title: "Privacy Policy | WisFile: Tidy Your Files with AI",
    description:
      "100% Local AI File Renamer and Organizer — No Fees, No Data Leaks. " +
      "Automatically generates clear, consistent filenames based on content.",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto px-4 py-16 max-w-4xl">
      <h1 className="mb-8 font-bold text-4xl">Wisfile Privacy Policy</h1>

      <h2 className="mt-8 mb-4 font-semibold text-2xl">1. Introduction</h2>
      <p className="mb-4 text-gray-700">
        At Wisfile, we are committed to protecting your privacy. This Privacy
        Policy explains how we collect, use, store, and disclose your personal
        information when you use our website and associated Services, including
        the AI file renaming and AI Foldering functions.
      </p>
      <p className="mb-4 text-gray-700">
        By using the Services, you consent to the practices described in this
        Privacy Policy and acknowledge that your data will be processed in
        compliance with Singapore&#39;s Personal Data Protection Act (PDPA), the
        EU General Data Protection Regulation (GDPR), and applicable U.S. laws
        (e.g., California Consumer Privacy Act where applicable).
      </p>

      <h2 className="mt-8 mb-4 font-semibold text-2xl">
        2. Information We Collect
      </h2>
      <h3 className="mt-6 mb-2 font-semibold text-xl">
        2.1 Personal Information
      </h3>
      <p className="mb-2 text-gray-700">
        We may collect the following types of personal information from you:
      </p>
      <ul className="mb-4 pl-6 text-gray-700 list-disc">
        <li>
          <b>Contact Information</b>: Such as your name, email address, phone
          number.
        </li>
        <li>
          <b>Account Information</b>: Username, password, and any other
          information you provide when creating or using your account.
        </li>
        <li>
          <b>Usage Information</b>: Information about how you use the Services,
          including which features (AI file renaming or AI Foldering) you use,
          the frequency of use, and the actions you take within these functions.
          For AI Foldering, we may collect limited metadata (e.g., file names or
          size), but we do <b>not</b> access or store full content when using
          local models. If you use online models, file content may be
          temporarily processed on secure servers for classification purposes,
          subject to deletion shortly after processing in accordance with our
          data retention policy (see Section 5).
        </li>
        <li>
          <b>Device Information</b>: Information about the device you use to
          access the Services, such as your device type, operating system, IP
          address, and browser type.
        </li>
      </ul>
      <ul className="mb-4 pl-6 text-gray-700 list-disc">
        <li>
          <b>For EU Users</b>: Data processing for the Services is based on
          lawfulness, transparency, and legitimate interests under the GDPR. You
          have the right to withdraw consent for data processing where
          applicable.
        </li>
        <li>
          <b>For U.S. Users</b>: We comply with the California Consumer Privacy
          Act (CCPA) for California residents, including the right to request
          deletion of personal data and opt-out of data sharing (if applicable).
        </li>
      </ul>
      <h3 className="mt-6 mb-2 font-semibold text-xl">
        2.2 Non-Personal Information
      </h3>
      <p className="mb-4 text-gray-700">
        We also collect non-personal information, such as aggregate usage
        statistics of the AI file renaming and AI Foldering functions, which
        does not identify you personally. This information helps us improve the
        Services and understand how users interact with them.
      </p>

      <h2 className="mt-8 mb-4 font-semibold text-2xl">
        3. How We Use Your Information
      </h2>
      <h3 className="mt-6 mb-2 font-semibold text-xl">
        3.1 Providing and Improving the Services
      </h3>
      <p className="mb-2 text-gray-700">
        We use your personal information to provide, maintain, and improve the
        Services. This includes:
      </p>
      <ul className="mb-4 pl-6 text-gray-700 list-disc">
        <li>Creating and managing your account (if applicable).</li>
        <li>
          Delivering the AI file renaming and AI Foldering functions, whether
          through local or online models. When using online models, we process
          data to perform tasks and optimize models in compliance with PDPA
          (Singapore), GDPR (EU), and relevant U.S. data protection laws.
        </li>
        <li>
          Analyzing usage patterns of these functions to enhance the
          functionality and user experience of the Services.
        </li>
      </ul>
      <h3 className="mt-6 mb-2 font-semibold text-xl">3.2 Communication</h3>
      <p className="mb-4 text-gray-700">
        We may use your contact information to send you important notices about
        the Services, updates to this Privacy Policy, and other administrative
        communications. We may also send you promotional emails if you have
        opted in to receive them. You can unsubscribe from promotional emails at
        any time by following the opt-out instructions in the email, in
        compliance with the EU ePrivacy Directive and U.S. CAN-SPAM Act.
      </p>

      <h2 className="mt-8 mb-4 font-semibold text-2xl">
        4. Sharing Your Information
      </h2>
      <h3 className="mt-6 mb-2 font-semibold text-xl">
        4.1 Third-Party Service Providers
      </h3>
      <p className="mb-4 text-gray-700">
        We may share your personal information with third-party service
        providers who assist us in operating the Services, such as hosting
        providers, analytics companies, and payment processors. When using
        online models for the AI functions, these service providers may have
        access to the data necessary to perform their tasks, but they are
        contractually obligated to protect your personal information and use it
        only for the purposes for which it was shared.
      </p>
      <p className="mb-4 text-gray-700">
        For <b>EU data subjects</b>, data transfers to service providers outside
        the EEA are conducted based on recognized safeguards such as{" "}
        <b>Standard Contractual Clauses (SCCs)</b> under the GDPR. For{" "}
        <b>Singapore-based users</b>, cross-border transfers comply with PDPA
        requirements.
      </p>
      <h3 className="mt-6 mb-2 font-semibold text-xl">
        4.2 Legal Requirements
      </h3>
      <p className="mb-4 text-gray-700">
        We may disclose your personal information if required to do so by law,
        in response to a subpoena, court order, or other legal process, or to
        protect our rights, property, or the safety of our users or the public.
        This includes any data related to your use of the AI file renaming and
        AI Foldering functions.
      </p>

      <h2 className="mt-8 mb-4 font-semibold text-2xl">5. Data Security</h2>
      <p className="mb-4 text-gray-700">
        We implement reasonable technical and organizational measures to protect
        your personal information from unauthorized access, disclosure,
        alteration, and destruction. When you use local models, the data remains
        on your device, and we recommend that you take appropriate security
        measures on your end. When using online models, we ensure that the data
        transmitted and processed on our servers is protected using
        industry-standard security protocols. However, no method of transmission
        over the internet or method of electronic storage is 100% secure, and we
        cannot guarantee the absolute security of your personal information.
      </p>
      <p className="mb-4 text-gray-700">
        We maintain security measures in line with Singapore&apos;s PDPA
        requirements, including regular audits and employee training on data
        protection.
      </p>
      <h2 className="mt-8 mb-4 font-semibold text-2xl">
        5.1 Children&#39;s Privacy
      </h2>
      <p className="mb-4 text-gray-700">
        We do not knowingly collect personal information from children under 13.
        If you are a parent or guardian and believe we have collected data from
        a child under 13, please contact us to request deletion.
      </p>
      <h3 className="mt-6 mb-2 font-semibold text-xl">
        Data Retention and Storage Limitation
      </h3>
      <p className="mb-2 text-gray-700">
        We retain personal data <b>only for as long as necessary</b> to fulfill
        the purposes stated in this policy or as required by law. For example:
      </p>
      <ul className="mb-4 pl-6 text-gray-700 list-disc">
        <li>
          Data submitted through <b>online models</b> for AI Foldering is stored
          only temporarily and deleted <b>within 24 hours</b>;
        </li>
        <li>
          User account and contact data are retained as long as the account is
          active, or until a user requests deletion.
        </li>
      </ul>
      <p className="mb-4 text-gray-700">
        We do <b>not</b> retain or access the content of files processed using{" "}
        <b>local models</b>, which remain solely on your device.
      </p>

      <h2 className="mt-8 mb-4 font-semibold text-2xl">6. Your Rights</h2>
      <p className="mb-4 text-gray-700">
        You have the right to access, correct, update, or delete your personal
        information. You can do this by logging into your account and modifying
        your profile settings, or by contacting our customer support team. You
        also have the right to object to or restrict our processing of your
        personal information in certain circumstances, especially regarding the
        data collected during the use of the AI file renaming and AI Foldering
        functions.
      </p>
      <ul className="mb-4 pl-6 text-gray-700 list-disc">
        <li>
          <b>EU Users</b>: You have the right to data portability, restrict
          processing, and lodge a complaint with your local data protection
          authority under GDPR.
        </li>
        <li>
          <b>U.S. Users</b>: California residents may submit CCPA requests
          (e.g., request to know, delete, or opt-out) by contacting us at{" "}
          <b>support@atominfinite.ai</b>.
        </li>
      </ul>

      <h2 className="mt-8 mb-4 font-semibold text-2xl">
        7. Changes to This Privacy Policy
      </h2>
      <p className="mb-4 text-gray-700">
        We reserve the right to update or modify this Privacy Policy at any
        time. We will notify you of any significant changes by posting a notice
        on our website or sending you an email. Your continued use of the
        Services after the effective date of any changes to this Privacy Policy
        constitutes your acceptance of the new terms.
      </p>

      <h2 className="mt-8 mb-4 font-semibold text-2xl">8. Contact Us</h2>
      <p className="mb-4 text-gray-700">
        For any questions or concerns regarding your privacy, you may contact us
        using the following details:
        <br />
        <b>support@atominfinite.ai</b>
      </p>
    </div>
  );
}
