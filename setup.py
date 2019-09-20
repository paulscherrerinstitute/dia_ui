import re

from setuptools import find_packages, setup

with open("dia_ui/__init__.py") as f:
    version = re.search(r'__version__ = "(.*?)"', f.read()).group(1)

setup(
    name="dia_ui",
    version=version,
    author="Leonardo Hax Damiani",
    author_email="leonardo.hax@psi.ch",
    description="DIA User Interface is a web interface tool that uses a flask python web server and polymer front end to access and visualize DIA (Detector Integration API).",
    packages=find_packages(),
    license="GNU GPLv3",
)