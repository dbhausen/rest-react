from rest_framework.metadata import BaseMetadata


class MaterialUIMetadata(BaseMetadata):
    def determine_metadata(self, request, view):
        return {
            "name": view.get_view_name(),
            "description": view.get_view_description(),
        }
