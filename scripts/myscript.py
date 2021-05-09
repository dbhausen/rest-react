import json
import urllib.request


def ping():
    class _externalLink:
        """Represents a link to a validated external web page
        attributes:  url, isValidated
        """

        def __init__(self, label, url):
            self.url = url
            self.label = label
            try:
                response = urllib.request.urlopen(url).read()
                if response:
                    self.isValidated = True
            except:
                self.isValidated = False

    with open("../frontend/src/Components/Links/links.json", "r") as f:
        links = json.load(f)

        validatedLinks = []
        for link in links:
            vlink = _externalLink(link["label"], link["url"])
            validatedLinks.append(
                {
                    "label": vlink.label,
                    "url": vlink.url,
                    "isValidated": vlink.isValidated,
                }
            )

        with open("../frontend/src/Components/Links/links.json", "w") as f:
            f.write(json.dumps(validatedLinks, indent=2, sort_keys=False))


ping()
