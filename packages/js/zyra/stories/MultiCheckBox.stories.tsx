import MultiCheckbox from "../src/components/MultiCheckbox";

export default {
    title: "Zyra/Components/MultiCheckbox",
    component: MultiCheckbox,
};

const appLocalizer = {
    khali_dabba: false,
}

const setting = {"dependentSetting":["asdf","asdf2"]};

type inputFieldType = {
    key: string;
    moduleEnabled?: string,
    proSetting?:boolean,
    dependentPlugin?: boolean,
    dependentPluginName?: string,
    dependentSetting?: string,
}

const inputField: inputFieldType = {
    key: "test-multi-checkbox",
    // proSetting:false,
    // dependentPlugin: true,
    // dependentPluginName: "demo-plugin",
    // dependentSetting: "dependentSetting123",
}

const modules = ["demo1", "demo2"];
const moduleOpen = ()=>{
        console.log("Module Opened");
    }

    const handleChange = (e, key, val)=>{
        console.log(`Changed: ${key} to ${val}`, e.target.value);
    }

    const moduleEnabledChanged = (
        moduleEnabled: string | undefined,
        dependentSetting: string | undefined = "",
        dependentPlugin: boolean | undefined = false,
        dependentPluginName: string | undefined = ""
    ): boolean => {
        console.log("Module Enabled Changed:", {moduleEnabled, dependentSetting, dependentPlugin, dependentPluginName});
        let popupData = {
            moduleName: "",
            settings: "",
            plugin: "",
        };

        if ( moduleEnabled && ! modules.includes( moduleEnabled ) ) {
            console.log("Module not found:", moduleEnabled);
            popupData.moduleName = moduleEnabled;
        }

        if (
            dependentSetting
            &&
            Array.isArray( setting[ dependentSetting ] ) &&
            setting[ dependentSetting ].length === 0
        ) {
            console.log("Dependent setting not found:", dependentSetting);
            popupData.settings = dependentSetting;
        }

        if ( ! dependentPlugin ) {
            console.log("Dependent plugin not found:", dependentPluginName);
            popupData.plugin = dependentPluginName;
        }

        if ( popupData.moduleName || popupData.settings || popupData.plugin ) {
            moduleOpen(  );
            moduleOpen(  );
            return true;
        }

        return false;
    };

    const proSettingChanged = ( isProSetting: boolean ): boolean => {
        if ( isProSetting && !appLocalizer?.khali_dabba ) {
            console.log("Pro setting");
            moduleOpen();
            return true;
        }
        return false;
    };
    const change = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if (
            ! proSettingChanged(
                inputField.proSetting ?? false
            ) &&
            ! moduleEnabledChanged(
                inputField.moduleEnabled ?? "",
                inputField.dependentSetting ?? "",
                inputField.dependentPlugin ?? true,
                inputField.dependentPluginName ?? ""
            )
        ) {
            handleChange(
                e,
                inputField.key,
                "multiple"
            );
        }
    }

const commonProps = {
    wrapperClass: "checkbox-list-side-by-side",
    descClass: "settings-metabox-description",
    selectDeselectClass: "btn-purple select-deselect-trigger",
    inputWrapperClass: "toggle-checkbox-header",
    hintOuterClass: "checkbox-description",
    hintInnerClass: "hover-tooltip",
    idPrefix: "toggle-switch",
    selectDeselectValue: "Select / Deselect All",
    rightContentClass: "settings-checkbox-description",
    onChange: change,
    onMultiSelectDeselectChange: (e) => {
        console.log("Select/Deselect clicked:", e);
    },
    proChanged: () => {
        console.log("Pro setting toggled");
    },
};

export const TestMultiCheckboxSingle = () => {
    const multiCheckBoxPropsDummy = {
        khali_dabba: appLocalizer?.khali_dabba,
        description: `Redirect users to the homepage when they click on the cart or checkout page. To customize the redirection to a different page, an upgrade to Pro <a href="https://multivendorx.com/woocommerce-request-a-quote-product-catalog/" target="_blank">WooCommerce Catalog Enquiry Pro</a>.`,
        inputInnerWrapperClass: "toggle-checkbox",
        inputClass: "",
        selectDeselect:false,
        rightContent: false,
        label: "Single Checkbox",
        options:
        [
            {
                key: "sample_checkbox",
                label: "If enabled, non-logged-in users can't access the enquiry flow.",
                value: 'sample_checkbox'
            },
        ],
        value:[],
        ...commonProps,
    };

    return <MultiCheckbox key={"sample_checkbox"} { ...multiCheckBoxPropsDummy } />;
};


export const TestMultiCheckboxMulti = () => {
    const multiCheckBoxPropsDummy = {
        khali_dabba: appLocalizer?.khali_dabba,
        description: ``,
        inputInnerWrapperClass: "toggle-checkbox",
        inputClass: "",
        lable: "Multi Checkbox",
        selectDeselect:true,
        rightContent: true,
        options:
        [
            {
                    key: "sync_courses_category",
                    label: 'Course categories', 
                    hints: "Scan the entire Moodle course category structure and synchronize it with the WordPress category listings.", 
                    value: "sync_courses_category",
                },
                {
                    key: "sync_courses_sku",
                    label: 'Course ID number - Product SKU', 
                    hints: "Retrieves the course ID number and assigns it as the product SKU.", 
                    value: "sync_courses_sku",
                    proSetting: true,
                },
                {
                    key: "sync_image",
                    label: 'Course image', 
                    hints: "Copies course images and sets them as WooCommerce product images.", 
                    value: "sync_image",
                    proSetting: true,
                },
        ],
        value:[],
        ...commonProps,
    };

    return <MultiCheckbox key={"sync-course-options"} { ...multiCheckBoxPropsDummy } />;
};
