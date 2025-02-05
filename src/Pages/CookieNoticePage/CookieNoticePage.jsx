import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CookieNoticePage = () => {
    const [openSection, setOpenSection] = useState(null);
    const currentLang = useSelector(state => state.language.language);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-indigo-900">COOKIE NOTICE</h1>

            {/* About cookies and similar technologies */}
            <div className="mb-4">
                <button
                    className="w-full flex justify-between items-center bg-gray-200 p-4 rounded-md shadow hover:bg-gray-300"
                    onClick={() => toggleSection('aboutCookies')}
                >
                    <span className="text-lg text-indigo-900 underline">About cookies and similar technologies</span>
                    <span>{openSection === 'aboutCookies' ? '▲' : '▼'}</span>
                </button>
                {openSection === 'aboutCookies' && (
                    <div className="p-4 bg-gray-100 border border-gray-300 mt-2 rounded-md">

                        <p class="text-sm">
                            DV Limited (referred to in this Notice as “we” or “us”), part of the
                            <a href="#" class="text-blue-600 underline">DV Group</a>
                            uses cookies and similar technologies (together "cookies"). Cookies are small data files uploaded on your device when you visit a website or mobile app. Cookies allow a website or a mobile app to collect and store a range of data on your devices. Some cookies are essential, while others allow us to enhance your experience, personalise content and adverts across your devices, and provide insights into how our website and mobile apps are being used.
                        </p>

                        <p class="mt-4 text-sm">
                            We use <span class="font-semibold">Session Cookies</span> which will automatically expire at the end of your browser session on our website and mobile apps. These are generally used for security purposes or to facilitate your use of our website or mobile apps. For example, we use session cookies to analyse the traffic on our website but also to remember the content of your online shopping basket.
                        </p>

                        <p class="mt-4 text-sm">
                            We may also use <span class="font-semibold">Persistent Cookies</span> which will be stored for a longer period depending on the nature of their purpose. For example, persistent cookies are used to remember your preferences and choices when you use our website or for targeted advertising purposes.
                        </p>

                        <p class="mt-4 text-sm">
                            We use <span class="font-semibold">Server-to-server</span> tracking by generating and storing a unique identifier when you click a tracking link or are shown an advertisement. When you later make an action such as a website visit or a purchase, the unique identifier is matched. This allows us to monitor the effectiveness of our advertisement.
                        </p>

                        <p class="mt-4 text-sm">
                            We might also use techniques such as pixels, which we don't refer to as cookies because they don't store information on your device. A pixel is an electronic file embedded into an email which allows us to see if the message was delivered, if and when you read it, and what you clicked on. We sometimes place these in marketing emails and newsletters. We use similar technology to get the same information about push notifications we send you, too.
                        </p>

                    </div>
                )}
            </div>

            {/* Essential cookies */}
            <div className="mb-4">
                <button
                    className="w-full flex justify-between items-center bg-gray-200 p-4 rounded-md shadow hover:bg-gray-300"
                    onClick={() => toggleSection('essential')}
                >
                    <span className="text-lg text-indigo-900 underline">Essential cookies</span>
                    <span>{openSection === 'essential' ? '▲' : '▼'}</span>
                </button>
                {openSection === 'essential' && (
                    <div className="p-4 bg-gray-100 border border-gray-300 mt-2 rounded-md">
                        <div>
                            <p className="text-sm mb-4">
                                Essential cookies enable core functionality such as the online shopping basket. Our website and mobile apps cannot function properly without these cookies. <strong>Therefore, we don’t request your permission to use essential cookies.</strong>
                            </p>
                            <p className="text-sm mb-4">
                                We also use essential cookies for security, network management, accessibility and to help webpages load quickly. They help us to keep track of what you are booking as you move through each stage of the booking process. Without them, the online booking process cannot take place.
                            </p>
                            <p className="text-sm mb-4">The following essential cookies are placed on your device.</p>

                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-2 text-left">Name</th>
                                        <th className="border border-gray-300 p-2 text-left">Provider</th>
                                        <th className="border border-gray-300 p-2 text-left">Description</th>
                                        <th className="border border-gray-300 p-2 text-left">Expiry Period</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Essential cookies table content (similar to your original table rows) */}
                                    <tr>
                                        <td className="border border-gray-300 p-2">AMCV_#@AdobeOrg</td>
                                        <td className="border border-gray-300 p-2">Adobe - Visitor API</td>
                                        <td className="border border-gray-300 p-2">
                                            Cookie associated with the Adobe Marketing Cloud. Contains a unique visitor identifier for a site visitor on a particular device/browser. All browsing behavior collected in Adobe is associated with this cookie value.
                                        </td>
                                        <td className="border border-gray-300 p-2">2 years</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">AMCVS_####@AdobeOrg</td>
                                        <td class="border border-gray-300 p-2">Adobe - Visitor API</td>
                                        <td class="border border-gray-300 p-2">
                                            Cookie associated with the Adobe Marketing Cloud which serves as a flag indicating that the session has been initialized.
                                        </td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">gpv_pn</td>
                                        <td class="border border-gray-300 p-2">Adobe Analytics</td>
                                        <td class="border border-gray-300 p-2">
                                            Cookie associated with the Adobe Analytics Get Previous Value plugin. It is used to return the value held in an Adobe variable.
                                        </td>
                                        <td class="border border-gray-300 p-2">30 minutes</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">PIM-SESSION-ID</td>
                                        <td class="border border-gray-300 p-2">Akamai</td>
                                        <td class="border border-gray-300 p-2">Cookie used for Akamai Page Integrity Manager, a solution used to monitor the integrity of assets loaded on our site.</td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">AWSALB</td>
                                        <td class="border border-gray-300 p-2">Amazon Web Services</td>
                                        <td class="border border-gray-300 p-2">Registers which server cluster is serving visitors to our site. Is used for load balancing to maintain site performance.</td>
                                        <td class="border border-gray-300 p-2">7 days</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">AWSALBCORS</td>
                                        <td class="border border-gray-300 p-2">Amazon Web Services</td>
                                        <td class="border border-gray-300 p-2">Registers which server cluster is serving visitors to our site. Is used for load balancing to maintain site performance.</td>
                                        <td class="border border-gray-300 p-2">7 days</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">da_lid</td>
                                        <td class="border border-gray-300 p-2">Decibel Insight</td>
                                        <td class="border border-gray-300 p-2">These cookies are used to collect information about how people use the website. This allows us to ensure the website is meeting your needs and to help us understand what we could improve.</td>
                                        <td class="border border-gray-300 p-2">1 year</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">da_sid</td>
                                        <td class="border border-gray-300 p-2">Decibel Insight</td>
                                        <td class="border border-gray-300 p-2">These cookies are used to collect information about how people use the website. It helps us understand what we could improve. This is the decibel session ID.</td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">dtCookie</td>
                                        <td class="border border-gray-300 p-2">Dynatrace</td>
                                        <td class="border border-gray-300 p-2">Primary cookie for Dynatrace site monitoring.</td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">dtLatC</td>
                                        <td class="border border-gray-300 p-2">Dynatrace</td>
                                        <td class="border border-gray-300 p-2">Cookie used for site monitoring. Stores the server ID.</td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">dtPC</td>
                                        <td class="border border-gray-300 p-2">Dynatrace</td>
                                        <td class="border border-gray-300 p-2">Cookie used for site monitoring. Stores the server ID.</td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">dtrckSession</td>
                                        <td class="border border-gray-300 p-2">Dynatrace</td>
                                        <td class="border border-gray-300 p-2">Cookie used for site monitoring.</td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">rxVisitor</td>
                                        <td class="border border-gray-300 p-2">Dynatrace</td>
                                        <td class="border border-gray-300 p-2">Cookie used for site monitoring. Stores the visitor ID.</td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">rxvt</td>
                                        <td class="border border-gray-300 p-2">Dynatrace</td>
                                        <td class="border border-gray-300 p-2">Cookie used for site monitoring. Stores the timestamp.</td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">vvct</td>
                                        <td class="border border-gray-300 p-2">Eptica Live Chat</td>
                                        <td class="border border-gray-300 p-2">This is the visit cookie for Live Chat.</td>
                                        <td class="border border-gray-300 p-2">30 minutes</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">vvcu</td>
                                        <td class="border border-gray-300 p-2">Eptica Live Chat</td>
                                        <td class="border border-gray-300 p-2">This is a permanent cookie for Live Chat.</td>
                                        <td class="border border-gray-300 p-2">3 years</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">__utma</td>
                                        <td class="border border-gray-300 p-2">Google Analytics</td>
                                        <td class="border border-gray-300 p-2">
                                            Used to distinguish users and sessions. The cookie is created when the JavaScript library executes and no existing __utma cookies exist. The cookie is updated every time data is sent to Google Analytics.
                                        </td>
                                        <td class="border border-gray-300 p-2">2 years</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_ga and _ga_R1P4W35ZRQ</td>
                                        <td class="border border-gray-300 p-2">Google Analytics</td>
                                        <td class="border border-gray-300 p-2">Used to distinguish visitors.</td>
                                        <td class="border border-gray-300 p-2">2 years</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_gac_</td>
                                        <td class="border border-gray-300 p-2">Google Analytics</td>
                                        <td class="border border-gray-300 p-2">
                                            Contains campaign-related information for the user. If you have linked your Google Analytics and Google Ads accounts, Google Ads website conversion tags will read this cookie unless you opt-out.
                                        </td>
                                        <td class="border border-gray-300 p-2">90 days</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_gat_tui2</td>
                                        <td class="border border-gray-300 p-2">Google Analytics</td>
                                        <td class="border border-gray-300 p-2">Used to limit request rate. Used for the Google Analytics tracker tui2.</td>
                                        <td class="border border-gray-300 p-2">1 minute</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_gat_tuinew</td>
                                        <td class="border border-gray-300 p-2">Google Analytics</td>
                                        <td class="border border-gray-300 p-2">Used to limit request rate. Used for the Google Analytics tracker tuinew.</td>
                                        <td class="border border-gray-300 p-2">1 minute</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_gid</td>
                                        <td class="border border-gray-300 p-2">Google Analytics</td>
                                        <td class="border border-gray-300 p-2">Used to distinguish visitors.</td>
                                        <td class="border border-gray-300 p-2">24 hours</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_ga2 / _gaDuplicate</td>
                                        <td class="border border-gray-300 p-2">Google Analytics / TUI</td>
                                        <td class="border border-gray-300 p-2">Replicates the behaviour of the _ga cookie but is set from our server.</td>
                                        <td class="border border-gray-300 p-2">2 years</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_omappvs</td>
                                        <td class="border border-gray-300 p-2">Optin Monster</td>
                                        <td class="border border-gray-300 p-2">
                                            Used alongside the Uniqodo solution. Used by the lead generation platform OptinMonster to determine if the visitor is returning and has visited the website before.
                                        </td>
                                        <td class="border border-gray-300 p-2">11 years</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">omSeen-i8uit3mw9zvaaypdcnnv</td>
                                        <td class="border border-gray-300 p-2">Optin Monster</td>
                                        <td class="border border-gray-300 p-2">Used alongside Uniqodo solution to show modal windows on the site.</td>
                                        <td class="border border-gray-300 p-2">25 days</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">QSI_HistorySession</td>
                                        <td class="border border-gray-300 p-2">Qualtrics</td>
                                        <td class="border border-gray-300 p-2">A session cookie that stores what pages a visitor has visited for the current session.</td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">QSI_SI_XXX_intercept</td>
                                        <td class="border border-gray-300 p-2">Qualtrics</td>
                                        <td class="border border-gray-300 p-2">Cookie used to prevent repeated display of our customer surveys.</td>
                                        <td class="border border-gray-300 p-2">Up to 90 days</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">QST</td>
                                        <td class="border border-gray-300 p-2">Qualtrics</td>
                                        <td class="border border-gray-300 p-2">Enables us to record that a survey response has been submitted and prevent the user from taking a survey again.</td>
                                        <td class="border border-gray-300 p-2">6 months</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">CONSENTMGR</td>
                                        <td class="border border-gray-300 p-2">Tealium</td>
                                        <td class="border border-gray-300 p-2">Saves preferences from the Tealium Consent Tool.</td>
                                        <td class="border border-gray-300 p-2">1 year</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">utag_main</td>
                                        <td class="border border-gray-300 p-2">Tealium</td>
                                        <td class="border border-gray-300 p-2">Tealium cookie that provides the Tag Manager functionalities.</td>
                                        <td class="border border-gray-300 p-2">1 year</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">ab_####_V#</td>
                                        <td class="border border-gray-300 p-2">TUI</td>
                                        <td class="border border-gray-300 p-2">
                                            Used for A/B tests and are in the format ab_####_v# or ab_####. Used to trial out new experiences on our site.
                                        </td>
                                        <td class="border border-gray-300 p-2">2 months</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">consent</td>
                                        <td class="border border-gray-300 p-2">TUI</td>
                                        <td class="border border-gray-300 p-2">Saves whether you have interacted with the cookie policy or not.</td>
                                        <td class="border border-gray-300 p-2">3 years</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">mytui.uid</td>
                                        <td class="border border-gray-300 p-2">TUI</td>
                                        <td class="border border-gray-300 p-2">Cookie associated with logging into your account.</td>
                                        <td class="border border-gray-300 p-2">Session or 400 days</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_uqd_param</td>
                                        <td class="border border-gray-300 p-2">Uniqodo</td>
                                        <td class="border border-gray-300 p-2">
                                            Cookie associated to our promo code solution, allowing us to provide code discounts. Autofill promotional code.
                                        </td>
                                        <td class="border border-gray-300 p-2">Session</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_uqd_sctk</td>
                                        <td class="border border-gray-300 p-2">Uniqodo</td>
                                        <td class="border border-gray-300 p-2">
                                            Cookie associated to our promo code solution, allowing us to provide code discounts. Unlock scheduled promotion in the interface.
                                        </td>
                                        <td class="border border-gray-300 p-2">30 days</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_uqd_st_pn</td>
                                        <td class="border border-gray-300 p-2">Uniqodo</td>
                                        <td class="border border-gray-300 p-2">
                                            Cookie associated to our promo code solution, allowing us to provide code discounts. Used only when users' browsers do not have localStorage. Stores validation key from previous validation.
                                        </td>
                                        <td class="border border-gray-300 p-2">1 hour</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_uqd_tr_uid</td>
                                        <td class="border border-gray-300 p-2">Uniqodo</td>
                                        <td class="border border-gray-300 p-2">
                                            Cookie associated to our promo code solution, allowing us to provide code discounts. This cookie is renewed every time the user receives an identifier from Uniqodo API. This cookie is used for tracking purposes of user requests.
                                        </td>
                                        <td class="border border-gray-300 p-2">30 days</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_uqd_trigger</td>
                                        <td class="border border-gray-300 p-2">Uniqodo</td>
                                        <td class="border border-gray-300 p-2">
                                            Cookie associated to our promo code solution, allowing us to provide code discounts. Trigger code that belongs to the last validated unique promotional code promotion.
                                        </td>
                                        <td class="border border-gray-300 p-2">30 days</td>
                                    </tr>
                                    <tr>
                                        <td class="border border-gray-300 p-2">_uqd_ue</td>
                                        <td class="border border-gray-300 p-2">Uniqodo</td>
                                        <td class="border border-gray-300 p-2">
                                            Cookie associated to our promo code solution, allowing us to provide code discounts. Non-uniqodo identifier cookie stored in base64 format.
                                        </td>
                                        <td class="border border-gray-300 p-2">30 days</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Non-essential cookies content */}
            <div className="mb-6">
                <button
                    className="w-full flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-lg transition-all duration-200 hover:bg-gray-300"
                    onClick={() => toggleSection('nonEssentialCookies')}
                >
                    <span className="text-lg text-indigo-900 underline">Non-essential cookies</span>
                    <span>{openSection === 'nonEssentialCookies' ? '▲' : '▼'}</span>
                </button>

                {openSection === 'nonEssentialCookies' && (
                    <div className="p-6 bg-gray-100 border border-gray-300 mt-4 rounded-lg shadow-md transition-all duration-300">
                        <p className="mb-6 text-sm text-gray-700 leading-relaxed">
                            Non-essential cookies help us make your experience better, improve the performance of our website and mobile apps, and deliver relevant, customer-tailored advertising. They won’t be placed on your device or collect any of your information unless you give your permission. Some non-essential cookies are placed by us, and some by third parties.
                        </p>

                        <h3 className="text-xl font-bold text-gray-800 mb-4">Personalisation Cookies</h3>
                        <p className="mb-6 text-sm text-gray-700 leading-relaxed">
                            These cookies improve the way our website and mobile apps work and provide you with enhanced, more personal features. For example, they collect data on how you use our website and help us assess and improve the way it works. They also help us remember your preferences, recent searches, and shortlisted holidays, making it easy for you to return to the previous search.
                        </p>

                        <h4 className="text-lg font-semibold text-gray-800 mb-4">The following personalisation cookies are placed on your device:</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto text-left text-sm border-collapse border border-gray-300">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="py-2 px-4 border-b">Name</th>
                                        <th className="py-2 px-4 border-b">Provider</th>
                                        <th className="py-2 px-4 border-b">Description</th>
                                        <th className="py-2 px-4 border-b">Expiry Period</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600">
                                    <tr className="border-b">
                                        <td className="py-2 px-4">ad-id</td>
                                        <td className="py-2 px-4">Amazon Advertising</td>
                                        <td className="py-2 px-4">Used by Amazon Advertising services to provide ad delivery, retargeting, and create audiences.</td>
                                        <td className="py-2 px-4">365 days</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">uid</td>
                                        <td className="py-2 px-4">Amobee</td>
                                        <td className="py-2 px-4">Used by Amobee DSP to track behavior to enhance custom targeting capabilities and marketing analytics.</td>
                                        <td className="py-2 px-4">180 days</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">mt.v</td>
                                        <td className="py-2 px-4">Kibo</td>
                                        <td className="py-2 px-4">Tracks visitors across the site to provide analytics for Kibo Personalization experiences and tracks products viewed, carted and purchased.</td>
                                        <td className="py-2 px-4">5 years</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">_taggstar_ses</td>
                                        <td className="py-2 px-4">Taggstar</td>
                                        <td className="py-2 px-4">Stores the session ID for Taggstar solution.</td>
                                        <td className="py-2 px-4">30 minutes</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4">_taggstar_vid</td>
                                        <td className="py-2 px-4">Taggstar</td>
                                        <td className="py-2 px-4">Stores a visitor ID for Taggstar solution.</td>
                                        <td className="py-2 px-4">90 days</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="my-6 text-sm text-gray-700 leading-relaxed">
                            These cookies help us deliver relevant online advertising and measure the effectiveness of our marketing communications. They collect data about your online behaviour, IP address, purchase history, and shopping habits to suggest products and services that may interest you. For example, they allow us to suggest flights from your nearest airport or products that you have shown interest in.
                        </p>

                        <p className="mb-6 text-sm text-gray-700 leading-relaxed">
                            If you do not accept these cookies, you may still see advertisements, but they will not be personalized based on your past behaviour. These adverts will not be as relevant to your interests.
                        </p>

                        <p className="mb-6 text-sm text-gray-700 leading-relaxed">
                            We use Server-to-server tracking to monitor the effectiveness of our advertisements. When you click on a tracking link or view an ad, a unique identifier is generated and stored. This allows us to match the identifier with later actions, such as a website visit or a purchase.
                        </p>

                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Data points shared with Facebook and Google via server-to-server tracking:
                        </h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto text-left text-sm border-collapse border border-gray-300">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="py-2 px-4 border-b">Key Type: Key Name</th>
                                        <th className="py-2 px-4 border-b">Description</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600">
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Email: em</td>
                                        <td className="py-2 px-4">A email address in lowercase. Example: joe@eg.com</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Phone: ph</td>
                                        <td className="py-2 px-4">A phone number including only digits with country code, area code, and number. Example: 16505551212</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Last name: ln</td>
                                        <td className="py-2 px-4">A last name in lowercase. Example: smith</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">First name: fn</td>
                                        <td className="py-2 px-4">A first name in lowercase. Example: joe</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Client IP address: client_ip_address</td>
                                        <td className="py-2 px-4">The IP address of the browser corresponding to the event (HTTP headers).</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Client user agent: client_user_agent</td>
                                        <td className="py-2 px-4">The user agent of the browser corresponding to the event.</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Click ID: fbc</td>
                                        <td className="py-2 px-4">The Facebook click ID value stored in the _fbc browser cookie.</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Browser ID: fbp</td>
                                        <td className="py-2 px-4">The Facebook browser ID value stored in the _fbp browser cookie.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>



            {/* Your choices when it comes to cookies */}
            <div className="mb-4">
                <button
                    className="w-full flex justify-between items-center bg-gray-200 p-4 rounded-md shadow hover:bg-gray-300"
                    onClick={() => toggleSection('choicesCookies')}
                >
                    <span className="text-lg text-indigo-900 underline">Your choices when it comes to cookies</span>
                    <span>{openSection === 'choicesCookies' ? '▲' : '▼'}</span>
                </button>
                {openSection === 'choicesCookies' && (
                    <div className="p-4 bg-gray-100 border border-gray-300 mt-2 rounded-md">
                        <p class="text-sm">
                            You can manage non-essential cookies and change your preferences at any time in Manage Cookie Preferences in the website footer. You can adjust the available sliders to ‘On’ or ‘Off’, then click ‘Save and Close’. You may need to refresh your page for your settings to take effect.
                        </p>

                        <p class="mt-4 text-sm">
                            Alternatively, you can use your browser settings to accept or reject new cookies and to delete existing persistent cookies. You can also set your browser to notify you each time new cookies are placed on your device. You can find more detailed information about how you can manage cookies at the
                            <a href="#" class="text-blue-600 underline">All About Cookies</a> and
                            <a href="#" class="text-blue-600 underline">Your Online Choices</a> websites.
                        </p>

                        <p class="mt-4 text-sm">
                            You can find out how to manage cookies on popular browsers:
                        </p>

                        <ul class="list-disc ml-8 mt-2 text-sm">
                            <li><a href="#" class="text-blue-600 underline">Google Chrome</a></li>
                            <li><a href="#" class="text-blue-600 underline">Microsoft Edge</a></li>
                            <li><a href="#" class="text-blue-600 underline">Mozilla Firefox</a></li>
                            <li><a href="#" class="text-blue-600 underline">Microsoft Internet Explorer</a></li>
                            <li><a href="#" class="text-blue-600 underline">Opera</a></li>
                            <li><a href="#" class="text-blue-600 underline">Apple Safari</a></li>
                        </ul>

                        <p class="mt-4 text-sm">
                            If you choose to disable some or all cookies, you may not be able to make full use of our website or mobile apps as it may disable some of our essential cookies. For example, you may not be able to add items to your shopping basket, proceed to checkout, or use any of our products and services that require you to sign in.
                        </p>

                        <p class="mt-4 text-sm">
                            We use Google Consent Mode on our websites. This means if you choose not to consent to cookies when you visit our sites, we’ll process your data in a way that complies with your privacy preferences and GDPR. Consent Mode still enables us to measure how you interact with our site, but at an aggregated rather than individual level – by collecting functional data like the time of day, for example.
                        </p>

                        <h3 class="mt-6 text-md font-semibold">Google Analytics</h3>
                        <p class="mt-2 text-sm">
                            Google Analytics helps us to understand how you interact with our website by collecting and reporting information anonymously. We use Google Analytics to help us analyse the information collected. It also reports website trends without identifying individual visitors. You can opt out of Google Analytics without affecting how you visit our website – for more information on opting out of being tracked by Google Analytics across all websites you use, visit:
                            <a href="http://tools.google.com/dlpage/gaoptout" class="text-blue-600 underline">http://tools.google.com/dlpage/gaoptout</a>.
                        </p>

                    </div>
                )}
            </div>

            {/* Changes to our Notice */}
            <div className="mb-4">
                <button
                    className="w-full flex justify-between items-center bg-gray-200 p-4 rounded-md shadow hover:bg-gray-300"
                    onClick={() => toggleSection('changesNotice')}
                >
                    <span className="text-lg text-indigo-900 underline">Changes to our Notice</span>
                    <span>{openSection === 'changesNotice' ? '▲' : '▼'}</span>
                </button>
                {openSection === 'changesNotice' && (
                    <div className="p-4 bg-gray-100 border border-gray-300 mt-2 rounded-md">
                        <p class="text-sm">
                            This Notice replaces all previous versions. We may change the Notice at any time so please check it regularly on our website(s) for any updates. If the changes are significant, we will provide a prominent notice on our website(s) including, if we believe it is appropriate, electronic notification of Cookie Notice changes.
                        </p>

                        <p className="mt-4 text-sm">
                            Learn more about who we are, how we process your personal data, and how you can contact us in our
                            <Link
                                to={`/${currentLang}/privacy`}
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                Privacy Notice
                            </Link>
                            .
                        </p>
                        <p class="mt-6 text-sm">
                            Last update: <span class="font-bold">January 2025</span>
                        </p>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CookieNoticePage;
