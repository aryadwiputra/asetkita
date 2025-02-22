<?php

namespace App\Http\Controllers;

use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statuses = Status::all();

        return Inertia::render('Dashboard/Statuses/Index', ['statuses' => $statuses]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Statuses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        Status::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return to_route('dashboard.statuses.index')->with('success', 'Successfully created status.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Status $Status)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $status = Status::find($id);

        return Inertia::render('Dashboard/Statuses/Edit', ['status' => $status]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        Status::find($id)->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return to_route('dashboard.statuses.index')->with('success', 'Successfully updated status.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = Status::find($id);

        if ($data) {
            $data->delete();
            return to_route('dashboard.statuses.index')->with('success', 'Successfully deleted status.');
        } else {
            return to_route('dashboard.statuses.index')->with('error', 'status not found.');
        }
    }
}