# Zenith code review notes

Each formation is separately testable and has an independent mathematical placement model. No external services are used to calculate orbital coordinates. The planetarium formation selector reads the registry at runtime; a preset changes actual 3D coordinates, not merely its label. New formats must handle `count=0` and return finite x/y/z positions.
