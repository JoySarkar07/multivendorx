import React, { useState, useEffect, JSX } from "react";
import axios from "axios";
import { useTour } from "@reactour/tour";

interface AppLocalizer {
    enquiry_form_settings_url: string;
    module_page_url: string;
    settings_page_url: string;
    customization_settings_url: string;
    apiUrl: string;
}

const appLocalizer: AppLocalizer = {
    enquiry_form_settings_url: "string",
    module_page_url: "string",
    settings_page_url: "string",
    customization_settings_url: "string",
    apiUrl: "string",
};

interface TourStep {
    selector: string;
    placement?: "top" | "bottom" | "left" | "right" | "auto";
    content: () => JSX.Element;
}

const Tour: React.FC = () => {
    const { setIsOpen, setSteps, setCurrentStep } = useTour();
    const [ isNavigating, setIsNavigating ] = useState< boolean >( false );

    const waitForElement = ( selector: string ): Promise< Element > =>
        new Promise( ( resolve ) => {
            const checkElement = () => {
                const element = document.querySelector( selector );
                if ( element ) {
                    resolve( element );
                } else {
                    setTimeout( checkElement, 100 );
                }
            };

            // Ensure the page is fully loaded before checking for the element
            if ( document.readyState === "complete" ) {
                checkElement();
            } else {
                window.addEventListener( "load", checkElement, { once: true } );
            }
        } );

    const navigateTo = async (
        url: string,
        step: number,
        selector: string
    ): Promise< void > => {
        setIsNavigating( true );
        setIsOpen( false ); // Close the tour
        window.location.href = url; // Navigate to the new page

        // Wait for the element to load
        await waitForElement( selector );

        // Ensure a short delay to handle rendering latencies
        setTimeout( () => {
            setCurrentStep( step ); // Move to the next step
            setIsOpen( true ); // Reopen the tour
            setIsNavigating( false );
        }, 500 ); // Adjust delay as needed
    };

    const finishTour = async (): Promise< void > => {
        setIsOpen( false ); // Close the tour

        try {
            await axios.post( `${ appLocalizer.apiUrl }/catalogx/v1/tour`, {
                active: false,
            } );
            console.log( "Tour marked as complete." );
        } catch ( error ) {
            console.error( "Error updating tour flag:", error );
        }
    };

    const settingsTourSteps: TourStep[] = [
        {
            selector: '[data="catalog-showcase-tour"]',
            placement: "top",
            content: () => (
                <div className="tour-box">
                    <h3>Enable Catalog Mode</h3>
                    <h4>
                        Activate Catalog mode to display your site as a product
                        catalog, removing the "Add to Cart" button and
                        optionally hiding prices.
                    </h4>
                    <div className="tour-footer">
                        <button
                            className="btn-purple"
                            onClick={ () => setCurrentStep( 1 ) }
                        >
                            Next
                        </button>
                        <button
                            className="btn-purple end-tour-btn"
                            onClick={ () => finishTour() }
                        >
                            End Tour
                        </button>
                    </div>
                </div>
            ),
        },
        {
            selector: '[data="enquiry-showcase-tour"]',
            content: () => (
                <div className="tour-box">
                    <h3>Enable Enquiry Mode</h3>
                    <h4>
                        Turn on Enquiry mode to add an "Enquiry" button for
                        customers, allowing direct communication via submitted
                        forms, viewable in the admin dashboard or via email.
                    </h4>
                    <div className="tour-footer">
                        <button
                            className="btn-purple"
                            onClick={ () => {
                                const checkbox =
                                    document.querySelector< HTMLInputElement >(
                                        `[id="toggle-switch-enquiry"]`
                                    );

                                if ( checkbox?.checked ) {
                                    navigateTo(
                                        appLocalizer.enquiry_form_settings_url,
                                        2,
                                        ".button-visibility"
                                    );
                                } else {
                                    setCurrentStep( 3 );
                                }
                            } }
                        >
                            Next
                        </button>
                        <button
                            className="btn-purple end-tour-btn"
                            onClick={ () => finishTour() }
                        >
                            End Tour
                        </button>
                    </div>
                </div>
            ),
        },
        {
            selector: ".button-visibility .adminLib-eye-blocked",
            content: () => (
                <div className="tour-box">
                    <h3>Customize Enquiry Form</h3>
                    <h4>
                        Head to the Enquiry Form Builder to enable the fields
                        customers need to fill out when submitting product
                        inquiries.
                    </h4>
                    <div className="tour-footer">
                        <button
                            className="btn-purple"
                            onClick={ () =>
                                navigateTo(
                                    appLocalizer.module_page_url,
                                    3,
                                    '[data="quote-showcase-tour"]'
                                )
                            }
                        >
                            Next
                        </button>
                        <button
                            className="btn-purple end-tour-btn"
                            onClick={ () => finishTour() }
                        >
                            End Tour
                        </button>
                    </div>
                </div>
            ),
        },
        {
            selector: '[data="quote-showcase-tour"]',
            content: () => (
                <div className="tour-box">
                    <h3>Enable Quote Module</h3>
                    <h4>
                        Activate the Quote module to let customers request
                        personalized product quotations. Admins can review the
                        quotes and provide tailored pricing for customers to
                        proceed with purchases.
                    </h4>
                    <div className="tour-footer">
                        <button
                            className="btn-purple"
                            onClick={ () => {
                                const checkbox =
                                    document.querySelector< HTMLInputElement >(
                                        `[id="toggle-switch-quote"]`
                                    );

                                if ( checkbox?.checked ) {
                                    navigateTo(
                                        appLocalizer.settings_page_url,
                                        4,
                                        '[data="quote-permission"]'
                                    );
                                } else {
                                    navigateTo(
                                        appLocalizer.customization_settings_url,
                                        5,
                                        ".enquiry-btn"
                                    );
                                }
                            } }
                        >
                            Next
                        </button>
                        <button
                            className="btn-purple end-tour-btn"
                            onClick={ () => finishTour() }
                        >
                            End Tour
                        </button>
                    </div>
                </div>
            ),
        },
        {
            selector: '[data="quote-permission"]',
            content: () => (
                <div className="tour-box">
                    <h3>Configure Quote Settings</h3>
                    <h4>
                        Set up your quotation settings by defining whether to
                        limit quote requests to logged-in users only.
                    </h4>
                    <div className="tour-footer">
                        <button
                            className="btn-purple"
                            onClick={ () =>
                                navigateTo(
                                    appLocalizer.customization_settings_url,
                                    5,
                                    ".enquiry-btn"
                                )
                            }
                        >
                            Next
                        </button>
                        <button
                            className="btn-purple end-tour-btn"
                            onClick={ () => finishTour() }
                        >
                            End Tour
                        </button>
                    </div>
                </div>
            ),
        },
        {
            selector: ".enquiry-btn",
            content: () => {
                const handleImageLoad = () => {
                    // Recalculate position after the image is loaded
                    const element = document.querySelector( ".enquiry-btn" );
                    element?.scrollIntoView( {
                        behavior: "smooth",
                        block: "center",
                    } );
                };

                return (
                    <div className="tour-box">
                        <h3>Arrange Enquiry Button</h3>
                        <img
                            // src={gif}
                            alt="Guide"
                            width="160"
                            // onLoad={handleImageLoad} // Handle image load event
                        />
                        <h4>
                            With the Enquiry tab selected, drag and drop to
                            position the Enquiry button and customize its look.
                        </h4>
                        <div className="tour-footer">
                            <button
                                className="btn-purple"
                                onClick={ () => finishTour() }
                            >
                                Finish
                            </button>
                        </div>
                    </div>
                );
            },
            placement: "auto", // Adjust dynamically based on space
        },
    ];

    useEffect( () => {
        // Fetch tour status API call
        const fetchTourState = async (): Promise< void > => {
            if ( window.location.href === appLocalizer.module_page_url ) {
                try {
                    const response = await axios.get< { active: string } >(
                        `${ appLocalizer.apiUrl }/catalogx/v1/tour`
                    );
                    console.log( response );

                    if ( response.data.active !== "" ) {
                        if ( setSteps ) {
                            setSteps( settingsTourSteps );
                        }
                        setIsOpen( true ); // Start the tour
                    }
                } catch ( error ) {
                    console.error( "Error fetching tour flag:", error );
                }
            }
        };

        if ( ! isNavigating ) {
            fetchTourState();
        }
    }, [ isNavigating, setSteps ] );

    return null;
};

export default Tour;
