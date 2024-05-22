import Admonition from "@theme/Admonition";

# NotionPageUpdate Component in Langflow

Langflow allows you to extend its functionality with custom components. The `NotionPageUpdate` component is designed to update the properties of a Notion page. It provides a convenient way to integrate updating Notion page properties into your Langflow workflows.

## Component Usage

To use the `NotionPageUpdate` component in your Langflow flow:

1. Drag and drop the `NotionPageUpdate` component onto the canvas.
2. Double-click the component to open its configuration.
3. Provide the required parameters as defined in the component's `build_config` method.
4. Connect the component to other nodes in your flow as needed.

Here's the code for the `NotionPageUpdate` component:

```python
import json
import requests
from typing import Dict, Any
from loguru import logger

from langflow.custom import CustomComponent
from langflow.schema import Record


class NotionPageUpdate(CustomComponent):
    display_name = "Update Page Property [Notion]"
    description = "Update the properties of a Notion page."
    documentation: str = "https://developers.notion.com/reference/patch-page"
    icon = "NotionDirectoryLoader"

    def build_config(self):
        return {
            "page_id": {
                "display_name": "Page ID",
                "field_type": "str",
                "info": "The ID of the Notion page to update.",
            },
            "properties": {
                "display_name": "Properties",
                "field_type": "str",
                "info": "The properties to update on the page (as a JSON string).",
                "multiline": True,
            },
            "notion_secret": {
                "display_name": "Notion Secret",
                "field_type": "str",
                "info": "The Notion integration token.",
                "password": True,
            },
        }

    def build(
        self,
        page_id: str,
        properties: str,
        notion_secret: str,
    ) -> Record:
        url = f"https://api.notion.com/v1/pages/{page_id}"
        headers = {
            "Authorization": f"Bearer {notion_secret}",
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",  # Use the latest supported version
        }

        try:
            parsed_properties = json.loads(properties)
        except json.JSONDecodeError as e:
            raise ValueError("Invalid JSON format for properties") from e

        data = {
            "properties": parsed_properties
        }
        
        response = requests.patch(url, headers=headers, json=data)
        response.raise_for_status()

        updated_page = response.json()

        output = "Updated page properties:\n"
        for prop_name, prop_value in updated_page["properties"].items():
            output += f"{prop_name}: {prop_value}\n"

        self.status = output
        return Record(data=updated_page)
```

Let's break down the key parts of this component:

- The `build_config` method defines the configuration fields for the component. It specifies the required parameters and their properties, such as display names, field types, and any additional information or validation.

- The `build` method contains the main logic of the component. It takes the configured parameters as input and performs the necessary operations to update the properties of a Notion page.

- The component interacts with the Notion API to update the page properties. It constructs the API URL, headers, and request data based on the provided parameters.

- The processed data is returned as a `Record` object, which can be connected to other components in the Langflow flow. The `Record` object contains the updated page data.

- The component also stores the updated page properties in the `status` attribute for logging and debugging purposes.

## Best Practices

When using the `NotionPageUpdate` component, consider the following best practices:

- Ensure that you have a valid Notion integration token with the necessary permissions to update page properties.
- Handle edge cases and error scenarios gracefully, such as invalid JSON format for properties or API request failures.
- Secure the Notion integration token by marking it as a password field in the component configuration.

## Troubleshooting

If you encounter any issues while using the `NotionPageUpdate` component, consider the following:

- Double-check that you have correctly configured the component with the required parameters, including the page ID, properties JSON, and Notion integration token.
- Verify that your Notion integration token has the necessary permissions to update page properties.
- Check the Langflow logs for any error messages or exceptions related to the component, such as invalid JSON format or API request failures.
- Consult the [Notion API Documentation](https://developers.notion.com/reference/patch-page) for specific troubleshooting steps or common issues related to updating page properties.

By leveraging the `NotionPageUpdate` component in Langflow, you can easily integrate updating Notion page properties into your language model workflows and build powerful applications that extend Langflow's capabilities.