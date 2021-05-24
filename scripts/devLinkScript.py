import json
import urllib.request


def ping():
    class _externalLink:
        """Represents a link to a validated external web page
        attributes:  url, isValidated
        """

        def __init__(self, label, url, okIfNotValid):
            self.url = url
            self.label = label
            self.okIfNotValid = okIfNotValid
            try:
                response = urllib.request.urlopen(url).read()
                if response:
                    self.isValidated = True
            except:
                self.isValidated = False

    with open(
        "c:/Users/david/P2/reg_project/frontend/src/Components/Links/linksIn.json", "r"
    ) as f:
        links = json.load(f)

        validatedLinks = []
        for link in links:
            vlink = _externalLink(link["label"], link["url"], link["okIfNotValid"])
            validatedLinks.append(
                {
                    "label": vlink.label,
                    "url": vlink.url,
                    "okIfNotValid": vlink.okIfNotValid,
                    "isValidated": vlink.isValidated,
                }
            )

        with open(
            "c:/Users/david/P2/reg_project/frontend/src/Components/Links/links.json",
            "w",
        ) as f:
            f.write(json.dumps(validatedLinks, indent=2, sort_keys=False))


ping()
